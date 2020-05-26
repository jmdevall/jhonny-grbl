
import {parseStartEnd,parseStart} from '../../src/parsers/parser'

describe("parseStartEnd",()=>{
    test("parseStartEnd",()=>{
        let parsed=parseStartEnd("ABC",{
            start: "A",
            end: "C",
            type: "test",
            parsePayload: (value)=>{
                return {
                    testpar: value
                }
            }
        });

        let expected={
            type: "test",
            payload:{
                testpar: "B"
            }
        };

        expect(parsed).toStrictEqual(expected);
    });

    test("parseStart",()=>{
        let parsed=parseStart("ABC",{
            start: "A",
            type: "test",
            parsePayload: (value)=>{
                return {
                    testpar: value
                }
            }
        });

        let expected={
            type: "test",
            payload:{
                testpar: "BC"
            }
        };

        expect(parsed).toStrictEqual(expected);
    });

})