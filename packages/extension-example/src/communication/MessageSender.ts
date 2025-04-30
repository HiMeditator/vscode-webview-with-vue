import * as vscode from 'vscode';

export class MessageSender{
    public static view: vscode.WebviewView | undefined;

    public static respondInit(){
        MessageSender.view?.webview.postMessage({
            command: 'extension.init.respond',
            data: '插件收到前端初始化完成的消息，特此回复'
        });
    }

    public static respondMessage(message: string){
        MessageSender.view?.webview.postMessage({
            command: 'extension.message',
            data: `插件已经收到前端消息：\n\n[\n\t"${message}"\n]\n\n特此回复`
        });
    }
}