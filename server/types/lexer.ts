export enum TokenType {
  String,
  Space,
  Key,
  Pairing,
  OpenParen,
  CloseParen,
  Unknown,
  EOF,
}

export interface Token {
  value: string
  type: TokenType
}
