import hostOutReducer,{hostOutSend ,hostOutBufferConsumed}
  from '../../src/reducers/hostOutReducer';
import GrblResponseParser from '../../src/grbl11/GrblResponseParser'

describe("hostOutReducer",()=>{
    const parser= new GrblResponseParser();
    const reducer=hostOutReducer(parser);

    test("hostOutReducer",()=>{
        const ok={
            type:'ok',
            payload:{}
        };

        const initialState={
            buffer:Buffer.from([])
        }


        const finalState=reducer(initialState,hostOutSend(ok));

        const expectedState={
            buffer:Buffer.from("ok\r\n")
        }
        expect(finalState).toStrictEqual(expectedState);
    });

    test("consume",()=>{
        const initialState={
            buffer:Buffer.from("holamundo\r\n")
        }
        const finalState=reducer(initialState,hostOutBufferConsumed(2));
        const expectedState={
            buffer:Buffer.from("lamundo\r\n")
        }
        expect(finalState).toStrictEqual(expectedState);
    })


})