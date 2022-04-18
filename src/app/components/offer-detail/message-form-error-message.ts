export class ErrorMessage {

  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {
  }
}

export const MessageFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Betreff muss angegeben werden.'),
  new ErrorMessage('text', 'required', 'Ein Text muss angegeben werden.'),
];
