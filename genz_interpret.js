// Interpreter
// Parser
// pretty print in JS --- https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript



class grammarChdeck(){
    g1= [Type.number + Type.Operator + Type.number + Type.EOC]; 
    g2= [Type.manifest + Type.string + Type.EOC];
    g3= [Type.yap + Type.number + Type.EOC];
}
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
//Where do I check the grammar? 
//In the parser before ou pass anything if the graamar has issues then give an error message 
//scan through tokens tosee if they match
//otherwise error message
//func check_grammar(){
  //  g1 =[Type.numb]
//}
//
//How do I handle multiple lines of commands?

//Where do I store vars