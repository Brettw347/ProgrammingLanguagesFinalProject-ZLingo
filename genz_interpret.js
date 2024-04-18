// Interpreter
// Parser
// pretty print in JS --- https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript


class Parser{
    constructor(tokens){
        this.tokens = tokens;
        this.index = 0;
        this.currentToken = this.tokens[this.index];
    }
    nextToken(){
        this.index++;
        if(this.index < this.tokens.length){
            this.currentToken = this.tokens[this.index];
        }
    }
    parse(){
        const token = this.currentToken;
        if(!token){
            throw new Error("   Syntax Error: This aint it Chief.Try Again.");
            //    console.log(token);
            
        }
    }

}
