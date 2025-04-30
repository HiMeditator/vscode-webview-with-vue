import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { MessageSender } from '../communication/MessageSender';
import { RequestHandler } from '../communication/RequestHandler';

export class SidebarViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'extension-example.sidebar';
    constructor(
        private readonly _extensionUri: vscode.Uri // 插件所在路径
    ) { }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        _context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        webviewView.webview.options = {
            enableScripts: true, // 允许脚本
            localResourceRoots: [this._extensionUri] // 允许加载本地资源的路径
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        MessageSender.view = webviewView;

        webviewView.webview.onDidReceiveMessage(
            RequestHandler.handleRequest
        );
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        // 打包的前端页面资源的路径
        const guiSidebarPath = vscode.Uri.joinPath(this._extensionUri, '/dist/gui-webviewview');
        // 前端页面的入口文件
        const indexPath = vscode.Uri.joinPath(guiSidebarPath, '/index.html');
        let indexHtml = fs.readFileSync(indexPath.fsPath, 'utf-8');
        const matchLinks = /(href|src)="([^"]*)"/g;
        const toUri = (_: string, prefix: 'href' | 'src', link: string) => {
            if (link === '#') {
                return `${prefix}="${link}"`;
            }
            const _path = path.join(guiSidebarPath.fsPath, link);
            const uri = vscode.Uri.file(_path);
            return `${prefix}="${webview.asWebviewUri(uri)}"`;
        };
        // 将本地资源路径替换成 webview 可以加载的资源路径
        indexHtml = indexHtml.replace(matchLinks, toUri);
        return indexHtml;
    }
}