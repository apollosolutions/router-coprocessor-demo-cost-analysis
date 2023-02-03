import express from 'express'
import {
    simpleEstimator,
    getComplexity,
    ComplexityEstimatorArgs,
    directiveEstimator
} from 'graphql-query-complexity';
import { buildSchema, GraphQLEnumType, GraphQLInterfaceType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLScalarType, GraphQLSchema, GraphQLUnionType, parse, separateOperations } from 'graphql'
import crypto from 'crypto'

let schemaHash: string;
let schema: GraphQLSchema;
let operationMap: Map<string, number> = new Map()
type TypeCostOptions = {
    enum?: number
    scalar?: number
    object?: number
    interface?: number
    union?: number
};

const typeCostEstimator = (options: TypeCostOptions) => {
    return (args: ComplexityEstimatorArgs): number | void => {
        if (!args.field.astNode) {
            return;
        }
        let t = args.field.type
        while (t instanceof GraphQLList || t instanceof GraphQLNonNull) {
            t = t.ofType
        }
        console.log(`Now on field ${args.field.name}; prior total: ${args.childComplexity}`)
        if (options.scalar && t instanceof GraphQLScalarType) {
            console.log(`Found scalar; adding: ${options.scalar}`)
            args.childComplexity += options.scalar
        }
        if (options.enum && t instanceof GraphQLEnumType) {
            console.log(`Found enum; adding: ${options.enum}`)
            args.childComplexity += options.enum
        }
        if (options.object && t instanceof GraphQLObjectType) {
            console.log(`Found object; adding: ${options.object}`)
            args.childComplexity += options.object
        }
        if (options.union && t instanceof GraphQLUnionType) {
            console.log(`Found union adding: ${options.union}`)
            args.childComplexity += options.union
        }
        if (options.interface && t instanceof GraphQLInterfaceType) {
            console.log(`Found interface; adding: ${options.interface}`)
            args.childComplexity += options.interface
        }
    }
}
const app = express()
app.use(express.json())
app.use('*', (req, res) => {
    try {
        let hash = crypto.createHash('md5').update(req.body.sdl).digest("hex")
        if (hash !== schemaHash) {
            console.log(`New schema, storing in memory...`)
            schemaHash = hash
            schema = buildSchema(req.body.sdl)
            operationMap = new Map()
        }
        let complexity = 0;
        let operationHash: string = crypto.createHash('md5').update(JSON.stringify(req.body.body)).digest("hex")
        if (operationMap.has(operationHash)) {
            complexity = operationMap.get(operationHash) ?? 0
        } else {
            let query = parse(req.body.body.query)
            complexity = getComplexity({
                estimators: [
                    typeCostEstimator({
                        union: 1,
                        interface: 1,
                        object: 2,
                    }),
                    directiveEstimator({
                        name: 'cost'
                    }),
                    simpleEstimator({ defaultComplexity: 0 })
                ],
                schema,
                query,
                variables: req.body.body.variables,
            });
            operationMap.set(operationHash, complexity)

        }


        console.log(`Cost is ${complexity} for operation ${req.body.body.operationName}`); // Output: 3
        // do stuff here
        if (complexity > 100) {
            return res.json({
                "version": 1,
                "stage": "RouterRequest",
                "control": {
                    Break: 429
                },
            })
        }
    } catch (e) {
        // Log error in case complexity cannot be calculated (invalid query, misconfiguration, etc.)
        // @ts-ignore
        console.error('Could not calculate complexity', e.message);
        return res.json({
            "version": 1,
            "stage": "RouterRequest",
            "control": {
                Break: 400
            },
        })
    }
    res.status(200).json({
        "version": 1,
        "stage": "RouterRequest",
        "control": "Continue",
    })
})

app.listen(4040, () => {
    console.log(`Listening on port ${4040}`)
})