import reducerT from '../../src/reducers/grblInReducer';
import {grblInAddBuffer,grblInConsumed} from '../../src/reducers/grblInReducer';
import {MessageParser} from '../../src/parsers/parser'

class TestingMessageParser implements MessageParser<string>{
    type="testing";
    parse(message: string): string | undefined {
        return "parsed:"+message;
    }
    compose(obj: string): string {
        throw new Error("Method not implemented.");
    }
}

let parser=new TestingMessageParser();
let reducer=reducerT(parser);

describe("el reducer",()=>{

    test("grblin_data",()=>{
        
        let initialState={
            buffer:Buffer.from("o")
            ,grblResponses:[]
            ,lastId: 0
        }
 
        let state=reducer(initialState,grblInAddBuffer(Buffer.from("k\r\nerror:33")));

        let expected={
            buffer: Buffer.from("error:33"),
            grblResponses:[{
                id:1,
                message: "parsed:ok"
            }]
            ,lastId:1
        };
        // console.log("expected:"+JSON.stringify(expected));
        // console.log("actual"+JSON.stringify(state));

        expect(state).toStrictEqual(expected)
    });

    test("grblInConsumed",()=>{
        let initialState={
            buffer: Buffer.from("dop"),
            grblResponses:[{
                id:1,
                message:"foobar"
            }]
            ,lastId:1
        };

        let state=reducer(initialState,grblInConsumed(1));

        expect(state.grblResponses.length).toBe(0);
    });

});
