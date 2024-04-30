# ProgrammingLanguagesFinalProject: ZLingo

<img src="images/ZLingo2.png" alt="" width="400"/>

## LANGCRAFT SP24
TEAM
1. Brett Williams
2. Elizaveta Kim
3. Mark Karomo

## Overview
This is the ZLingo language. This language is designed to use Gen Z slang in a programming context. This language allows for basic object oriented programming.

## Features
- File extension: .gz

## Syntax Rules
|Syntax|Description|
|------|-----------|
|double period ( ..)|End of command character. The space before the periods is necessary.|
|colon (: )| Used after certain keywords to indicate what is being passed to the keyword, function, or command. (Example: "yapper: 'Hello World' .." would print 'Hello World' to the console). The space after the colon is necessary.|
|@| Indicates a single line comment|
|??| Indicates a multi-line comment. Begin with '??' and end with '?? \\'|

## Variables
|Variable Type|Description|
|-------------|-----------|
|manifest| Used to declare an int variable|
|yap| Used to declare a string variable|

## Keywords
|Keyword|Description|
|-------|-----------|
|serve| Used to declare a function|
|gatekeep| Makes a variable static|
|clapback| Return statement|
|dip| Break statement|
|ghost| Null|
|facts| True|
|cap| False|

### Functions/Commands
|Function Keyword|Description|
|----------------|-----------|
|yapper| Used to print text to the console|
|yeet<| Removes the first item from a list|
|yeet>| Removes the last item from a list|
|yeet[i]| Removes the item at the given index (i) of a list|
|mansplain| Makes all characters in a yap variable captialized|
|shortking| Makes all characters in a yap variable lowercased|
|stringGaslight| Changes a yap variable to a manifest variable|
|intGaslight| Changes a manifest variable to a yap variable|

### Loops
|Loop Name|Description|
|---------|-----------|
|Finesse| Runs an if loop based on the given condition|
|ThrowHands| Else Statement|
|LetItCook| Runs the given code while the given condition is true|
|VibeCheck| Runs a for loop until the given condition is met|

## Demo Code Snippets
#### Print statement:
```
yapper: "Hello world" ..
```

#### int (manifest) variable declaration:
```
manifest number = 20 ..
```

#### Static (gatekeep) string (yap) variable declaration
```
gatekeep yap text = "Bing Bong" ..
```

#### Print statement w/ the variable 'text'
```
yap text = "Hello World" ..

yapper: text ..
```

#### Creates a new string (yap) variable by changing the int (manifest) variable 'num' into a string (yap) variable
```
manifest number = 30 ..

yap num = stringGaslight: number ..
```

#### Creates a new int (manifest) variable by changing the string (yap) variable 'num2' into an int (manifest) variable
````
yap num2 = 3 ..

manifest textNum = intGaslight: num2 ..
````

#### Single line comment
```
@ This is a comment
```

#### Multi-Line Comment
```
?? This is a
Multi-line comment ?? \
```
#### This creates a function that return 'facts' or 'cap' depending on the value of 'x' that is passed to the function:
```
        serve FactOrCap: x
           finesse: x >= 10
               clapback facts ..
           throwhands
               clapback cap ..
```

#### Calls the FactOrCap function, passing the variable 'number' to it:
```
       FactOrCap: number ..
```

#### Creates a while loop that prints out numbers until the given variable is greater than 30
```
       serve LetItCook: x < 30
           yapper: x ..
           x++ ..
```

### Grammar Statements
The following are proper grammar statements that can be used in the language. Grammar statements marks with asterisks (*) are not functional yet.
- manifest VARNAME = NUM OPERATOR NUM ..
- manifest VARNAME = NUM OPERATOR NUM OPERATOR ..
- VARNAME OPERATOR OPERATOR ..*
- yap VARNAME = STRING ..*
- yap VARNAME = stringGaslight: VARNAME2 .. *
- manifest VARNAME = intGaslight: VARNAME2 ..*
- serve FUNCTIONNAME: PARAMETER *
- FUNCTIONNAME: PARAMETER *
- yapper: YAP, MANIFEST, OR STRING


## Error Messages
|Error Message|Description|
|-------------|-----------|
|This ain't it chief|Syntax Error|
|The range ain't ranging|Range Error|
|It's giving error|Type Error|
|Bruh|Index Error|
|Big Yikes|Internal Error|
|And I oop-|Reference Error|

## Usage Instructions
1. Make sure [node.js](https://nodejs.org/en/download) is installed. If it isn't, click the link to download it.
2. Download this repo to your machine.
3. Open this repo in VSCode or another code editor
4. Open a terminal
5. Type 'node genz_interpret.js demo.gz' into the terminal and hit 'enter' to run.
6. (OPTIONAL) If you would like to change any code, you can go into the 'demo.gz' file to edit or add your own code.

## State of the Language
The language can currently do simple math (addition, subtraction, multiplication, division) as well as store simple manifest and yap variables. 

### Upcoming Features
- Loops
- Functions
- Comments
- Lists/Arrays
- Non-variable keywords (facts, cap, dip, etc)
- PEMDAS
- Commands (yeet<, stringGaslight, etc)

### Bugs
- Manifest variables are not able to be processed through the parser.
- Only partial grammar checking; still in development.