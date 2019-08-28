export class Model {
  name: string;
  status: string;
  about: string;
  rows: number;
  cols: number;
  color: string;
  imagen: string;
  mensaje: Message[];
}

export class Message {
  who: string;
  content: string;
}
