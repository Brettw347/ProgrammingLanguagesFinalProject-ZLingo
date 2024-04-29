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
        this.lines = input.split('\n'); // split input into lines
        this.out = [];
    }

    lexLine(line) {
        // keywords
        const p_manifest = /^manifest$/;
        const p_yap = /^yap$/;
        const p_serve = /^serve$/
        const p_gatekeep = /^gatekeep$/
        const p_clapback = /^clapback$/
        const p_dip = /^dip$/
        const p_ghost = /^ghost$/
        const p_facts = /^facts$/
        const p_cap = /^cap$/
        const p_yapper = /^yapper$/
        const p_yeet = /^yeet$/
        const p_mansplain = /^mansplain$/
        const p_shortking = /^shortking$/
        const p_gaslight = /^gaslight$/
        // operators
        const p_equals = /^=$/;
        const p_add = /^\+$/;
        const p_sub = /^\-$/;
        const p_div = /^\*$/;
        const p_mult = /^\/$/;

        // Literals
        const p_digits = /^\d+$/;

        const p_string_double = /^"([^"]+(?:"[^"]+)*)"/;
        const p_string_single = /^'([^']+(?:'[^']+)*)'/;

        // Special Chars
        const p_specialchar = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/;

        // EOC
        const p_eoc = /^\.\.$/;
        
        // comments
        const p_singlecomm = /@.*$/;
        const p_multicomm_start = /^\?\?$/;
        const p_multicomm_end = /^\?\?$/;

        let insideMultiComm = false;

        const tokens = line.split(/\s+/); // split line into tokens based on whitespace

        for (let token of tokens) {
            // tokenizing COMMENTS
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
            
            // tokenizing STRINGS
            if (token.startsWith('"')) {
                const endQuoteIndex = line.indexOf('"', 1);
                if (endQuoteIndex !== -1) {
                    const value = line.substring(1, endQuoteIndex);
                    this.out.push({"Type": Type.STRING, "value": value});
                    continue;
                }
            } else if (token.startsWith("'")) {
                const endQuoteIndex = line.indexOf("'", 1);
                if (endQuoteIndex !== -1) {
                    const value = line.substring(1, endQuoteIndex);
                    this.out.push({"Type": Type.STRING, "value": value});
                    continue;
                }
            }

            // Keywords and Identifiers
            if (p_manifest.test(token) || p_yap.test(token) || p_serve.test(token) || p_gatekeep.test(token) || p_clapback.test(token)
            || p_dip.test(token) || p_ghost.test(token) || p_facts.test(token) || p_cap.test(token) || p_yapper.test(token) 
            || p_yeet.test(token) || p_mansplain.test(token) || p_shortking.test(token) || p_gaslight.test(token)){
                this.out.push({"Type": Type.KEYWORD, "value": token});
                continue;
            }

            // Numbers
            if (p_digits.test(token)) {
                this.out.push({"Type": Type.NUMBER, "value": token});
                continue;
            }
            
            // Operators
            if (p_equals.test(token) || p_add.test(token) || p_sub.test(token) || p_div.test(token) || p_mult.test(token)) {
                this.out.push({"Type": Type.OPERATOR, "value": token});
                continue;
            }

            // Special Chars
            if (p_specialchar.test(token)) {
                this.out.push({"Type": Type.SPECIALCHAR, "value": token});
                continue;
            }

            // EOC
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