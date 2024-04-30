const fs = require('fs');

const Type = {
    IDENTIFIER: "IDENTIFIER",
    OPERATOR: "OPERATOR",
    EOC: "ENDOFCOMMAND",
    KEYWORD: "KEYWORD",
    COMMENT: "COMMENT",
    NUMBER: "NUMBER",
    STRING: "STRING",
    SPECIALCHAR: "SPECIALCHAR"
};

class Lexer {
    constructor(input) {
        this.lines = input.split(/\n/); // split input into lines
        this.out = [];
    }

    lexLine(line) {
            // Keywords
            const p_manifest = /^manifest$/;
            const p_yap = /^yap$/;
            const p_serve = /^serve$/;
            const p_gatekeep = /^gatekeep$/;
            const p_clapback = /^clapback$/;
            const p_dip = /^dip$/;
            const p_ghost = /^ghost$/;
            const p_facts = /^facts$/;
            const p_cap = /^cap$/;
            const p_yapper = /^yapper$/;
            const p_yeet = /^yeet$/;
            const p_mansplain = /^mansplain$/;
            const p_shortking = /^shortking$/;
            const p_stringGaslight = /^stringGaslight$/;
            const p_intGaslight = /^intGaslight$/;
            // Operators
            const p_equals = /^=$/;
            const p_add = /^\+$/;
            const p_sub = /^\-$/;
            const p_div = /^\*$/;
            const p_mult = /^\/$/;
            // Literals
            const p_digits = /^\d+$/;
            const p_identifier = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
            const p_string_double = /^"([^"]+(?:"[^"]+)*)"/;
            const p_string_single = /^'([^']+(?:'[^']+)*)'/;
            // Special Chars
            const p_specialchar = /:<>\[\]/;
            // EOC
            const p_eoc = /^\.\.$/;
            // Comments
            const p_singlecomm = /@.*$/;
            const p_multicomm_start = /^\?\?$/;
            const p_multicomm_end = /^\?\?$/;
    
        // check for multiline comment status
        let insideMultiComm = false;

        const tokens = line.match(/"([^"]*)"/g) || []; // extract all complete string literals

        const remainingTokens = line.split(/\s+/); // split remaining content into tokens based on whitespace

        for (let token of remainingTokens) {
            // check for comments
            if (p_singlecomm.test(token)) {
                break; // skip the rest of the line if single-line comment is encountered
            }
            if (p_multicomm_start.test(token)) {
                insideMultiComm = true;
                continue; // skip the start of multiline comment token
            }
            if (insideMultiComm) {
                if (p_multicomm_end.test(token)) {
                    insideMultiComm = false;
                }
                continue; // skip tokens inside multiline comment
            }
            
            // check for different types of tokens
            if (p_manifest.test(token) || p_yap.test(token) || p_serve.test(token) || p_gatekeep.test(token) || p_clapback.test(token)
            || p_dip.test(token) || p_ghost.test(token) || p_facts.test(token) || p_cap.test(token) || p_yapper.test(token) 
            || p_yeet.test(token) || p_mansplain.test(token) || p_shortking.test(token) || p_stringGaslight.test(token) 
            || p_intGaslight.test(token)) {
                this.out.push({"Type": Type.KEYWORD, "value": token});
                continue;
            }

            if (p_identifier.test(token)) {
                this.out.push({"Type": Type.IDENTIFIER, "value": token});
                continue;
            }

            if (p_digits.test(token)) {
                this.out.push({"Type": Type.NUMBER, "value": token});
                continue;
            }

            if (p_equals.test(token) || p_add.test(token) || p_sub.test(token) || p_div.test(token) || p_mult.test(token)) {
                this.out.push({"Type": Type.OPERATOR, "value": token});
                continue;
            }

            if (p_specialchar.test(token)) {
                this.out.push({"Type": Type.SPECIALCHAR, "value": token});
                continue;
            }

            if (p_eoc.test(token)) {
                this.out.push({"Type": Type.EOC, "value": token});
            }
        }
        for (let token of tokens) {
            // tokenizing strings
            this.out.push({ "Type": Type.STRING, "value": token });
            line = line.replace(token, ''); // remove string from line
        }
    }

    lex() {
        for (let line of this.lines) {
            this.lexLine(line);
        }
        return this.out;
    }
}


//CREATE GRAMMAR CHECKER
class grammarCheck{
    constructor(){
    this.g1= [Type.NUMBER + Type.OPERATOR + Type.NUMBER + Type.EOC]; 
    this.g2= [Type.KEYWORD + Type.STRING + Type.EOC];
    this.g3= [Type.KEYWORD + Type.NUMBER + Type.EOC];
    }
}
//courtesy OF https://github.com/bpetcaugh/langcraftSP24/blob/main/pud_interpret.js
class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.index = 0;
        this.current_token = this.tokens[this.index] || null;
        const grammar = new grammarCheck();
        this.grammarCheck = grammar;
    }
    nextToken() {
        this.index++;
        this.current_token = this.tokens[this.index] || null;
    }
    checkGrammar() {
        // Compare current tokens against predefined grammar rules
        if (this.grammarCheck.g1.includes(this.current_token.Type)) {
            // Rule g1 satisfied
        } else if (this.grammarCheck.g2.includes(this.current_token.Type)) {
            // Rule g2 satisfied
        } else if (this.grammarCheck.g3.includes(this.current_token.Type)) {
            // Rule g3 satisfied
        } else {
            throw new Error("Syntax Error: This ain't it Chief. Check your input.");
        }
    }

    parse() {
        if (!this.current_token) {
            return null;  // Early exit if there are no tokens
        }

        // Start with the first number literal
        while (this.current_token.Type !== Type.NUMBER) {
            this.nextToken();
        }
        let left = {
            'Type': 'Literal',
            'value': this.current_token.value
        };
        this.nextToken();

        // Process as long as there are tokens and the current token is an operator
        while (this.current_token && this.current_token.Type === Type.OPERATOR) {
            const operator = this.current_token.value;
            this.nextToken();
            if (!this.current_token || this.current_token.Type !== Type.NUMBER) {
                throw new Error("Syntax Error: Expected a number after operator");
            }
            // if (this.current_token && this.current_token.Type !== Type.EOC) {
            //     throw new Error("Syntax Error: Unexpected token after the expression.");
            // }
            const right = {
                'Type': 'Literal',
                'value': this.current_token.value
            };

            left = {
                'Type': 'BinaryOperation',
                'operator': operator,
                'left': left,
                'right': right
            };
            this.nextToken();
        }
        return left;
    }
}


class Interpreter {
    constructor() {}

    evaluateAST(ast) {
        if (ast['Type'] === 'Literal') {
            return parseInt(ast['value']);  // Convert the value to an integer and return it
        } else if (ast['Type'] === 'BinaryOperation') {
            const leftVal = this.evaluateAST(ast['left']);  // Recursively evaluate the left child
            const rightVal = this.evaluateAST(ast['right']);  // Recursively evaluate the right child

            // Perform the operation based on the operator
            switch (ast['operator']) {
                case '+':
                    return leftVal + rightVal;
                case '-':
                    return leftVal - rightVal;
                case '*':
                    return leftVal * rightVal;
                case '/':
                    if (rightVal === 0) {
                        throw new Error("Division by zero");  // Handle division by zero
                    }
                    return leftVal / rightVal;
                default:
                    throw new Error(`Unsupported operator: ${ast['operator']}`);
            }
        }
    }
}


const filename = 'demo.gz';
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const lexer = new Lexer(data);
    const tokens = lexer.lex();

    console.log("\n--------TOKENS--------");
    console.log("");
    for (let t of tokens) {
        console.log(t);
    }
    console.log("");

    const parser = new Parser(tokens);
    let ast = parser.parse(tokens);

    const result = new Interpreter().evaluateAST(ast);
    console.log(result);
    

});
