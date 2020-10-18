import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { Jql_multi_queryContext } from "./JQLParser";
import { Jql_queryContext } from "./JQLParser";
import { QueryContext } from "./JQLParser";
import { Raw_textContext } from "./JQLParser";
import { Query_partContext } from "./JQLParser";
import { Query_fieldContext } from "./JQLParser";
import { SpecialContext } from "./JQLParser";
import { Special_nameContext } from "./JQLParser";
import { ArgumentsContext } from "./JQLParser";
import { Keyword_argumentContext } from "./JQLParser";
import { ArgumentContext } from "./JQLParser";
import { Arith_exprContext } from "./JQLParser";
import { Arith_operatorContext } from "./JQLParser";
import { Factor_exprContext } from "./JQLParser";
import { Factor_operatorContext } from "./JQLParser";
import { Power_exprContext } from "./JQLParser";
import { Power_operatorContext } from "./JQLParser";
import { Math_valueContext } from "./JQLParser";
import { ValueContext } from "./JQLParser";
import { Primitive_valueContext } from "./JQLParser";
import { List_valueContext } from "./JQLParser";
import { Set_valueContext } from "./JQLParser";
import { Object_valueContext } from "./JQLParser";
import { PairContext } from "./JQLParser";
import { KeyContext } from "./JQLParser";
import { NumberContext } from "./JQLParser";
import { NameContext } from "./JQLParser";
/**
 * This interface defines a complete listener for a parse tree produced by
 * `JQLParser`.
 */
export interface JQLListener extends ParseTreeListener {
    /**
     * Enter a parse tree produced by `JQLParser.jql_multi_query`.
     * @param ctx the parse tree
     */
    enterJql_multi_query?: (ctx: Jql_multi_queryContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.jql_multi_query`.
     * @param ctx the parse tree
     */
    exitJql_multi_query?: (ctx: Jql_multi_queryContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.jql_query`.
     * @param ctx the parse tree
     */
    enterJql_query?: (ctx: Jql_queryContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.jql_query`.
     * @param ctx the parse tree
     */
    exitJql_query?: (ctx: Jql_queryContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.query`.
     * @param ctx the parse tree
     */
    enterQuery?: (ctx: QueryContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.query`.
     * @param ctx the parse tree
     */
    exitQuery?: (ctx: QueryContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.raw_text`.
     * @param ctx the parse tree
     */
    enterRaw_text?: (ctx: Raw_textContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.raw_text`.
     * @param ctx the parse tree
     */
    exitRaw_text?: (ctx: Raw_textContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.query_part`.
     * @param ctx the parse tree
     */
    enterQuery_part?: (ctx: Query_partContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.query_part`.
     * @param ctx the parse tree
     */
    exitQuery_part?: (ctx: Query_partContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.query_field`.
     * @param ctx the parse tree
     */
    enterQuery_field?: (ctx: Query_fieldContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.query_field`.
     * @param ctx the parse tree
     */
    exitQuery_field?: (ctx: Query_fieldContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.special`.
     * @param ctx the parse tree
     */
    enterSpecial?: (ctx: SpecialContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.special`.
     * @param ctx the parse tree
     */
    exitSpecial?: (ctx: SpecialContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.special_name`.
     * @param ctx the parse tree
     */
    enterSpecial_name?: (ctx: Special_nameContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.special_name`.
     * @param ctx the parse tree
     */
    exitSpecial_name?: (ctx: Special_nameContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.arguments`.
     * @param ctx the parse tree
     */
    enterArguments?: (ctx: ArgumentsContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.arguments`.
     * @param ctx the parse tree
     */
    exitArguments?: (ctx: ArgumentsContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.keyword_argument`.
     * @param ctx the parse tree
     */
    enterKeyword_argument?: (ctx: Keyword_argumentContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.keyword_argument`.
     * @param ctx the parse tree
     */
    exitKeyword_argument?: (ctx: Keyword_argumentContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.argument`.
     * @param ctx the parse tree
     */
    enterArgument?: (ctx: ArgumentContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.argument`.
     * @param ctx the parse tree
     */
    exitArgument?: (ctx: ArgumentContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.arith_expr`.
     * @param ctx the parse tree
     */
    enterArith_expr?: (ctx: Arith_exprContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.arith_expr`.
     * @param ctx the parse tree
     */
    exitArith_expr?: (ctx: Arith_exprContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.arith_operator`.
     * @param ctx the parse tree
     */
    enterArith_operator?: (ctx: Arith_operatorContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.arith_operator`.
     * @param ctx the parse tree
     */
    exitArith_operator?: (ctx: Arith_operatorContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.factor_expr`.
     * @param ctx the parse tree
     */
    enterFactor_expr?: (ctx: Factor_exprContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.factor_expr`.
     * @param ctx the parse tree
     */
    exitFactor_expr?: (ctx: Factor_exprContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.factor_operator`.
     * @param ctx the parse tree
     */
    enterFactor_operator?: (ctx: Factor_operatorContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.factor_operator`.
     * @param ctx the parse tree
     */
    exitFactor_operator?: (ctx: Factor_operatorContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.power_expr`.
     * @param ctx the parse tree
     */
    enterPower_expr?: (ctx: Power_exprContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.power_expr`.
     * @param ctx the parse tree
     */
    exitPower_expr?: (ctx: Power_exprContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.power_operator`.
     * @param ctx the parse tree
     */
    enterPower_operator?: (ctx: Power_operatorContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.power_operator`.
     * @param ctx the parse tree
     */
    exitPower_operator?: (ctx: Power_operatorContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.math_value`.
     * @param ctx the parse tree
     */
    enterMath_value?: (ctx: Math_valueContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.math_value`.
     * @param ctx the parse tree
     */
    exitMath_value?: (ctx: Math_valueContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.value`.
     * @param ctx the parse tree
     */
    enterValue?: (ctx: ValueContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.value`.
     * @param ctx the parse tree
     */
    exitValue?: (ctx: ValueContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.primitive_value`.
     * @param ctx the parse tree
     */
    enterPrimitive_value?: (ctx: Primitive_valueContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.primitive_value`.
     * @param ctx the parse tree
     */
    exitPrimitive_value?: (ctx: Primitive_valueContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.list_value`.
     * @param ctx the parse tree
     */
    enterList_value?: (ctx: List_valueContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.list_value`.
     * @param ctx the parse tree
     */
    exitList_value?: (ctx: List_valueContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.set_value`.
     * @param ctx the parse tree
     */
    enterSet_value?: (ctx: Set_valueContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.set_value`.
     * @param ctx the parse tree
     */
    exitSet_value?: (ctx: Set_valueContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.object_value`.
     * @param ctx the parse tree
     */
    enterObject_value?: (ctx: Object_valueContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.object_value`.
     * @param ctx the parse tree
     */
    exitObject_value?: (ctx: Object_valueContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.pair`.
     * @param ctx the parse tree
     */
    enterPair?: (ctx: PairContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.pair`.
     * @param ctx the parse tree
     */
    exitPair?: (ctx: PairContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.key`.
     * @param ctx the parse tree
     */
    enterKey?: (ctx: KeyContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.key`.
     * @param ctx the parse tree
     */
    exitKey?: (ctx: KeyContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.number`.
     * @param ctx the parse tree
     */
    enterNumber?: (ctx: NumberContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.number`.
     * @param ctx the parse tree
     */
    exitNumber?: (ctx: NumberContext) => void;
    /**
     * Enter a parse tree produced by `JQLParser.name`.
     * @param ctx the parse tree
     */
    enterName?: (ctx: NameContext) => void;
    /**
     * Exit a parse tree produced by `JQLParser.name`.
     * @param ctx the parse tree
     */
    exitName?: (ctx: NameContext) => void;
}
