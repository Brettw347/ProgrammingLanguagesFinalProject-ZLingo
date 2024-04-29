// Interpreter
// Parser
// pretty print in JS --- https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript

const fs = require('fs');

const Type = {
    IDENTIFIER: "IDENTIFIER",
    OPERATOR: "OPERATOR",
    EOC: "ENDOFCOMMAND",
    NUMBER: "NUMBER",
    KEYWORD: "KEYWORD",
    COMMENT: "COMMENT"
};
// what cat should : go in

class Lexer {
    constructor(input) {
        this.lines = input.split('\n'); // split input into lines
        this.out = [];
    }

    lexLine(line) {
        // keywords
        const p_int = /^manifest$/;
        const p_string = /^yap$/;
        // operators
        const p_equals = /^=$/;
        const p_add = /^\+$/;
        const p_sub = /^\-$/;
        const p_div = /^\/$/;
        const p_mult = /^\*$/;
        // number literals
        const p_digits = /^\d+$/;
        // EOC
        const p_eoc = /^\.\.$/;
        // comments
        const p_singlecomm = /@.*$/;
        const p_multicomm_start = /^\?\?$/;
        const p_multicomm_end = /^\?\?$/;

        let insideMultiComm = false;

        const tokens = line.split(/\s+/); // split line into tokens based on whitespace

        for (let token of tokens) {
            if (p_singlecomm.test(token)) {
                break; // skip the rest of the line if single-line comment is encountered
            }
/*
if(line.startswith('$$$')){
    inMultilineComment = true;
    continue;
}else if(line.trim().startswith('s')){
    continue;
}
    

}
*/
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

            if (p_int.test(token) || p_string.test(token)) {
                this.out.push({"Type": Type.KEYWORD, "value": token});
            } else if (p_equals.test(token) || p_add.test(token) || p_sub.test(token) || p_div.test(token) || p_mult.test(token)) {
                this.out.push({"Type": Type.OPERATOR, "value": token});
            } else if (p_digits.test(token)) {
                this.out.push({"Type": Type.NUMBER, "value": token});
            } else if (p_eoc.test(token)) {
                this.out.push({"Type": Type.EOC, "value": token});
            }
        }
    }

    lex() {
        for (let line of this.lines) {
            this.lexLine(line);
        }
        return this.out;
    }
}


//CREATE GRAMMAR CHECKER to kick things off if they 
class grammarCheck{
    g1= [Type.NUMBER + Type.OPERATOR + Type.NUMBER + Type.EOC]; 
    g2= [Type.KEYWORD + Type.STRING + Type.EOC];
    g3= [Type.KEYWORD + Type.NUMBER + Type.EOC];
}

//courtesy OF https://github.com/bpetcaugh/langcraftSP24/blob/main/pud_interpret.js
class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.index = 0;
        this.current_token = this.tokens[this.index] || null;
    }

    nextToken() {
        this.index++;
        this.current_token = this.tokens[this.index] || null;
    }

    parse() {
        if (!this.current_token) {
            return null;  // Early exit if there are no tokens
        }

        // Start with the first number literal
        if (this.current_token.Type !== Type.NUMBER) {
            throw new Error("Syntax Error: Expected a number at the beginning of the expression.");
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
            if (this.current_token && this.current_token.Type !== Type.EOC) {
                throw new Error("Syntax Error: Unexpected token after the expression.");
            }
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


const filename = 'input.txt';
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
});