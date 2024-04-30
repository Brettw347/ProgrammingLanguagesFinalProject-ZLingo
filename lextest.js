const fs = require('fs');

const Type = {
    IDENTIFIER: "IDENTIFIER",
    OPERATOR: "OPERATOR",
    EOC: "ENDOFCOMMAND",
    KEYWORD: "KEYWORD",
    COMMENT: "COMMENT",
    // LITERALS
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
        // Check for multiline comment status
        let insideMultiComm = false;

        const tokens = line.match(/"([^"]*)"/g) || []; // Extract all complete string literals

        for (let token of tokens) {
            // Tokenizing strings
            this.out.push({ "Type": Type.STRING, "value": token });
            line = line.replace(token, ''); // Remove string from line
        }

        const remainingTokens = line.split(/\s+/); // Split remaining content into tokens based on whitespace

        for (let token of remainingTokens) {
            // Check for comments
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
            
            // Check for different types of tokens
            if (p_manifest.test(token) || p_yap.test(token) || p_serve.test(token)) {
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
    }

    lex() {
        for (let line of this.lines) {
            this.lexLine(line);
        }
        return this.out;
    }
}

const p_manifest = /^manifest$/;
const p_yap = /^yap$/;
const p_serve = /^serve$/;
// Other keyword regexes...

const p_equals = /^=$/;
const p_add = /^\+$/;
const p_sub = /^\-$/;
const p_div = /^\*$/;
const p_mult = /^\/$/;

const p_digits = /^\d+$/;
const p_identifier = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

const p_specialchar = /[:@<>\[\]]/;
const p_eoc = /^\.\.$/;
const p_singlecomm = /@.*$/;
const p_multicomm_start = /^\?\?$/;
const p_multicomm_end = /^\?\?$/;

// Usage
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