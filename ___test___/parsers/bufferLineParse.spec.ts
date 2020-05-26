import bufferLineParse from '../../src/parsers/bufferResponseParse';

describe('extraer buffer ', () => {
    
    const buffer = Buffer.from("a");
    

    test("no new line in buffer -> all the same",()=>{
        let buffer=Buffer.from("a");

        let parsed=bufferLineParse(buffer);

        const expected={
            newBuffer: buffer,
        }
        expect(parsed).toStrictEqual(expected);
    });

    test("extract new line as message",()=>{
        let buffer=Buffer.from("foo\r\na");

        let parsed=bufferLineParse(buffer);
        const expected={
            newBuffer: Buffer.from("a"),
            message: "foo"
        }
        expect(parsed).toStrictEqual(expected);
    });

});


