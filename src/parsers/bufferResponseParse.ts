export interface Message {
  newBuffer: Buffer;
  message?: string;
}

export default function (buffer: Buffer): Message {
  let index = null;

  index = buffer.indexOf('\r\n');
  if (index !== -1) {
    return {
      newBuffer: Buffer.from(buffer.slice(index + 2)),
      message: '' + Buffer.from(buffer.slice(0, index)),
    };
  }

  return {
    newBuffer: buffer,
  };
}
