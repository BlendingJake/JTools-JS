// Generated from c:\Users\jacob\Projects\JavaScript\JTools-JS\src\grammar\JQL.g4 by ANTLR 4.8
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class JQLLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		PRIMITIVE=10, LPAREN=11, RPAREN=12, DOT=13, LBRACKET=14, RBRACKET=15, 
		COMMA=16, LBRACE=17, RBRACE=18, SEMI=19, AT=20, DOLLAR=21, DIGITS=22, 
		LETTERS=23, STRING=24, WS=25, LAST=26;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
			"PRIMITIVE", "LPAREN", "RPAREN", "DOT", "LBRACKET", "RBRACKET", "COMMA", 
			"LBRACE", "RBRACE", "SEMI", "AT", "DOLLAR", "DIGITS", "LETTERS", "STRING", 
			"WS", "LAST"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'='", "'+'", "'-'", "'/'", "'//'", "'*'", "'%'", "'**'", "'_'", 
			null, "'('", "')'", "'.'", "'['", "']'", "','", "'{'", "'}'", "':'", 
			"'@'", "'$'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, "PRIMITIVE", 
			"LPAREN", "RPAREN", "DOT", "LBRACKET", "RBRACKET", "COMMA", "LBRACE", 
			"RBRACE", "SEMI", "AT", "DOLLAR", "DIGITS", "LETTERS", "STRING", "WS", 
			"LAST"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}


	public JQLLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "JQL.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\34\u0094\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31"+
		"\t\31\4\32\t\32\4\33\t\33\3\2\3\2\3\3\3\3\3\4\3\4\3\5\3\5\3\6\3\6\3\6"+
		"\3\7\3\7\3\b\3\b\3\t\3\t\3\t\3\n\3\n\3\13\3\13\3\13\3\13\3\13\3\13\3\13"+
		"\3\13\3\13\3\13\3\13\3\13\3\13\5\13Y\n\13\3\f\3\f\3\r\3\r\3\16\3\16\3"+
		"\17\3\17\3\20\3\20\3\21\3\21\3\22\3\22\3\23\3\23\3\24\3\24\3\25\3\25\3"+
		"\26\3\26\3\27\6\27r\n\27\r\27\16\27s\3\30\6\30w\n\30\r\30\16\30x\3\31"+
		"\3\31\3\31\3\31\7\31\177\n\31\f\31\16\31\u0082\13\31\3\31\3\31\3\31\3"+
		"\31\3\31\7\31\u0089\n\31\f\31\16\31\u008c\13\31\3\31\5\31\u008f\n\31\3"+
		"\32\3\32\3\33\3\33\2\2\34\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25"+
		"\f\27\r\31\16\33\17\35\20\37\21!\22#\23%\24\'\25)\26+\27-\30/\31\61\32"+
		"\63\33\65\34\3\2\b\3\2\62;\4\2C\\c|\3\2$$\3\2))\5\2\13\f\16\17\"\"\3\2"+
		"\f\f\2\u009c\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2"+
		"\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2"+
		"\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\2!\3\2"+
		"\2\2\2#\3\2\2\2\2%\3\2\2\2\2\'\3\2\2\2\2)\3\2\2\2\2+\3\2\2\2\2-\3\2\2"+
		"\2\2/\3\2\2\2\2\61\3\2\2\2\2\63\3\2\2\2\2\65\3\2\2\2\3\67\3\2\2\2\59\3"+
		"\2\2\2\7;\3\2\2\2\t=\3\2\2\2\13?\3\2\2\2\rB\3\2\2\2\17D\3\2\2\2\21F\3"+
		"\2\2\2\23I\3\2\2\2\25X\3\2\2\2\27Z\3\2\2\2\31\\\3\2\2\2\33^\3\2\2\2\35"+
		"`\3\2\2\2\37b\3\2\2\2!d\3\2\2\2#f\3\2\2\2%h\3\2\2\2\'j\3\2\2\2)l\3\2\2"+
		"\2+n\3\2\2\2-q\3\2\2\2/v\3\2\2\2\61\u008e\3\2\2\2\63\u0090\3\2\2\2\65"+
		"\u0092\3\2\2\2\678\7?\2\28\4\3\2\2\29:\7-\2\2:\6\3\2\2\2;<\7/\2\2<\b\3"+
		"\2\2\2=>\7\61\2\2>\n\3\2\2\2?@\7\61\2\2@A\7\61\2\2A\f\3\2\2\2BC\7,\2\2"+
		"C\16\3\2\2\2DE\7\'\2\2E\20\3\2\2\2FG\7,\2\2GH\7,\2\2H\22\3\2\2\2IJ\7a"+
		"\2\2J\24\3\2\2\2KL\7v\2\2LM\7t\2\2MN\7w\2\2NY\7g\2\2OP\7h\2\2PQ\7c\2\2"+
		"QR\7n\2\2RS\7u\2\2SY\7g\2\2TU\7p\2\2UV\7w\2\2VW\7n\2\2WY\7n\2\2XK\3\2"+
		"\2\2XO\3\2\2\2XT\3\2\2\2Y\26\3\2\2\2Z[\7*\2\2[\30\3\2\2\2\\]\7+\2\2]\32"+
		"\3\2\2\2^_\7\60\2\2_\34\3\2\2\2`a\7]\2\2a\36\3\2\2\2bc\7_\2\2c \3\2\2"+
		"\2de\7.\2\2e\"\3\2\2\2fg\7}\2\2g$\3\2\2\2hi\7\177\2\2i&\3\2\2\2jk\7<\2"+
		"\2k(\3\2\2\2lm\7B\2\2m*\3\2\2\2no\7&\2\2o,\3\2\2\2pr\t\2\2\2qp\3\2\2\2"+
		"rs\3\2\2\2sq\3\2\2\2st\3\2\2\2t.\3\2\2\2uw\t\3\2\2vu\3\2\2\2wx\3\2\2\2"+
		"xv\3\2\2\2xy\3\2\2\2y\60\3\2\2\2z\u0080\7$\2\2{|\7^\2\2|\177\7$\2\2}\177"+
		"\n\4\2\2~{\3\2\2\2~}\3\2\2\2\177\u0082\3\2\2\2\u0080~\3\2\2\2\u0080\u0081"+
		"\3\2\2\2\u0081\u0083\3\2\2\2\u0082\u0080\3\2\2\2\u0083\u008f\7$\2\2\u0084"+
		"\u008a\7)\2\2\u0085\u0086\7^\2\2\u0086\u0089\7)\2\2\u0087\u0089\n\5\2"+
		"\2\u0088\u0085\3\2\2\2\u0088\u0087\3\2\2\2\u0089\u008c\3\2\2\2\u008a\u0088"+
		"\3\2\2\2\u008a\u008b\3\2\2\2\u008b\u008d\3\2\2\2\u008c\u008a\3\2\2\2\u008d"+
		"\u008f\7)\2\2\u008ez\3\2\2\2\u008e\u0084\3\2\2\2\u008f\62\3\2\2\2\u0090"+
		"\u0091\t\6\2\2\u0091\64\3\2\2\2\u0092\u0093\n\7\2\2\u0093\66\3\2\2\2\13"+
		"\2Xsx~\u0080\u0088\u008a\u008e\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}