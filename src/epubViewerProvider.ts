import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as vscode from 'vscode';
import { Util } from './common/util';

/**
 * support view epub file
 */
export class EpubViewerProvider implements vscode.CustomReadonlyEditorProvider {

    private extensionPath: string;

    constructor(context: vscode.ExtensionContext) {
        this.extensionPath = context.extensionPath;
    }

    public openCustomDocument(uri: vscode.Uri, openContext: vscode.CustomDocumentOpenContext, token: vscode.CancellationToken): vscode.CustomDocument | Thenable<vscode.CustomDocument> {
        return { uri, dispose: (): void => { } };
    }
    public resolveCustomEditor(document: vscode.CustomDocument, webviewPanel: vscode.WebviewPanel, token: vscode.CancellationToken): void | Thenable<void> {
        console.log(234234)
        const uri = document.uri;
        const webview = webviewPanel.webview;
        const folderPath = vscode.Uri.file(resolve(uri.fsPath, ".."));
        webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(this.extensionPath), folderPath]
        }
        webview.onDidReceiveMessage(async () => webview.postMessage({ type: "open", content: webview.asWebviewUri(uri).toString() }))
        webview.html = Util.buildPath(readFileSync(this.extensionPath + "/resource/epub/index.html", 'utf8'), webview, this.extensionPath + "/resource/epub");
    }
}