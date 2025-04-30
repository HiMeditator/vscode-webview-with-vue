import * as vscode from 'vscode';
import { MessageSender } from './MessageSender';

export class RequestHandler {
    public static view: vscode.WebviewView | undefined;

    public static handleRequest(message: any) {
        // console.log('Plugin receive:', JSON.stringify(message));
        switch (message.command) {
            case 'init.ready':
                RequestHandler.respondInit();
                break;
            case 'message.send':
                RequestHandler.respondMessage(message.message);
                break;
        }
    }

    private static respondInit(){
        vscode.window.showInformationMessage('插件收到前端初始化完成的消息');
        MessageSender.respondInit();
    }

    private static respondMessage(message: string){
        vscode.window.showInformationMessage(`插件收到前端消息：\n${message}\n`);
        MessageSender.respondMessage(message);
    }
}