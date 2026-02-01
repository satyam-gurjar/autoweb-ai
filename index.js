import { FunctionResponse, GoogleGenAI, Type } from "@google/genai";
import { exec } from "child_process";
import util from "util";
import os from 'os';
import readlineSync from "readline-sync";
import 'dotenv/config';

const platform = os.platform();

const execute = util.promisify(exec);

const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function executeCommand({ command }) {

    try {
        const { stdout, stderr } = await execute(command);

        if (stderr) {
            return `error: ${stderr}`
        }

        return `success: ${stdout}`

    }
    catch (err) {
        return `error: ${err}`
    }
}


const commandExecuter = {
    name: 'executeCommand',
    description: 'It takes any shell/terminal command and execute it. It will help to create, read , update, write, delete any folder and file',
    parameters: {
        type: Type.OBJECT,
        properties: {
            command: {
                type: Type.STRING,
                description: "It is the reminal/shell command. Ex: mkdir calculater, touch calculater/index.js etc",
            }
        },
        required: ['command']
    }

}

const History = [];


async function buildWebsite() {


    while (true) {
        const result = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: History,
            config: {
                systemInstruction: `You are a websit Builder, which will create the frontend part of the website using terminal/shell command 
              You will give shell/teminal command one by one adn our tool will execute it
              Give the command according to the Operating sytem  we are using.
              My Current Operatin System is: ${platform}.

              Your Job
              1: Analyze the user requirement
              2: Break down the requirement into smaller tasks
              3: For each task, generate the shell/terminal command to create the frontend part of the website
              4: Wait for the command execution result before moving to the next task
              5: If any command fails, generate the command to fix the issue and then proceed
              6: Continue this process until all parts of the website are created as per user requirement
              7: Only generate commands related to frontend website development (HTML, CSS, JavaScript). Do not generate commands for backend or server-side development.
              
              Step by step instructions:
              1: Understand the user requirement from the conversation history
              2: Identify the next task needed to progress towards completing the website
              3: Generate the appropriate shell/terminal command for that task
              4: Use the tool 'executeCommand' to execute the command
              5: Wait for the execution result
              6: Analyze the result:
                 a: If success, proceed to identify the next task
                 b: If error, generate commands to fix the issue
              7: Repeat steps 2-6 until the website is fully built as per user requirement


              Note: Only generate one command at a time and wait for its execution result before generating the next command.
              Do not generate multiple commands in one response.
              Always use the tool 'executeCommand' to execute your commands.
            `,
                tools: [
                    {
                        functionDeclarations: [commandExecuter]
                    }
                ]
            },
        })
        if (result.functionCalls && result.functionCalls.length > 0) {

            const functionCall = result.functionCalls[0];

            const { name, args } = functionCall;

            const toolResponse = await executeCommand(args);

            const funcitonResponsePart = {
                name: functionCall.name,
                response: {
                    result: toolResponse,
                }
            }

            History.push({
                role: 'model',
                parts: [
                    {
                        functionCall: functionCall,
                    }
                ]
            });

            History.push({
                role: 'user',
                parts: [
                    {
                        functionResponse: funcitonResponsePart,
                    }
                ]
            })
        }
        else {
            break;
            console.log(result.text);
            History.push({
                role: 'model',
                parts: [{ text: result.text }]
            })
        }
    }
}

while (true) {
    const question = readlineSync.question('Ask me anything: ');

    if (question.toLowerCase() === 'exit') {
        break;
    }

    History.push({
        role: 'user',
        parts: [{ text: question }]
    })

    await buildWebsite(question);
}