import { Activity } from './activity';

export class Document
{
    idDocument: number;
    isCheck: boolean;
    pathDoucument: string;
    titleActivity: string;
    idActivity: number;
    titleDocument: string;
    isEnableDocument: boolean;
    activity: Activity;
    type: string;
}