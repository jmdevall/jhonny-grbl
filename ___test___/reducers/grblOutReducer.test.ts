import reducer from '../../src/reducers/grblOutReducer';
import {grblOutSend,grblOutBufferConsumed} from '../../src/reducers/grblOutReducer';
import {getCharCode} from  '../../src/parsers/parser';


describe('grbl out reducer ', () => {
    const rtcMessage={
        type:"rtc",
        payload: getCharCode('?')
    }

    const blockMessage={
        type:"block",
        payload:"holamundo"
    }

    test("out rtc",()=>{

        let action = grblOutSend(rtcMessage);
        let initialState={
            buffer:Buffer.from("")
        };
        let resState=reducer(initialState, action);

        // console.log(JSON.stringify(initialState));
        // console.log(JSON.stringify(resState));

        let expected={
           buffer: Buffer.from("?")
        }
        expect(resState).toStrictEqual(expected);
    })

    test("out block",()=>{
        let action = grblOutSend(blockMessage);
        let initialState={
            buffer:Buffer.from("foo\r\n")
        };
        let resState=reducer(initialState, action);

        // console.log(JSON.stringify(initialState));
        // console.log(JSON.stringify(resState));

        let expected={
           buffer: Buffer.from("foo\r\nholamundo\r\n")
        }
        expect(resState).toStrictEqual(expected);
    })

    test("out buffer consumed",()=>{
        let action = grblOutBufferConsumed(3);

        let initialState={
            buffer: Buffer.from("foo\r\nholamundo\r\n")
        }

        let finalState=reducer(initialState,action);

        let expected={
            buffer: Buffer.from("\r\nholamundo\r\n")
        }
        expect(finalState).toStrictEqual(expected);
    })



});