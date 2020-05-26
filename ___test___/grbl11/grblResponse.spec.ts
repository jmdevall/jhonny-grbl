import GrblResponseParser from '../../src/grbl11/GrblResponseParser';
import {GrblResponse} from '../../src/grbl11/responses';


describe("parseGrblResponse",()=>{

    let sut=new GrblResponseParser();

    test("parsea ok",()=>{
        const string="ok";
        const message=sut.parse(string);

        const expected={
            type:'ok',
            payload:{}
        };

        expect(message).toStrictEqual(expected);

        const good=message as GrblResponse;
        expect(sut.compose(good)).toStrictEqual(string);
    });

    test("parsea error",()=>{
        const string="error:2";
        const message=sut.parse(string);

        const expected={
            type:'error',
            payload:{
                errorcode:2
            }
        }

        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);
    });

    test("parsea welcome",()=>{
        const string="Grbl 1.1h ['$' for help]"
        const message=sut.parse(string);

        const expected={
            type:'welcome',
            payload:{
                version:'1.1h'
            }
        }
        
        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);

    });

    test("parsea alarma",()=>{
        const string="ALARM:2";
        const message=sut.parse(string);

        const expected={
            type: 'alarm',
            payload: {
                alarmcode:2
            }
        }
        expect(message).toStrictEqual(expected);

        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);

    });

    test("parsea startup line",()=>{
        const string="$N0=G54";

        const message=sut.parse(string);

        const expected={
            type: 'startupLine',
            payload: {
                line: 0,
                value: "G54"
            }
        }

        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);

    });

    test("parsea settings",()=>{
        const string="$3=10";

        const message=sut.parse(string);

        const expected={
            type: 'settings',
            payload: {
                code: 3,
                value: 10
            }
        }

        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);

    });


    test("parsea non queried Feedback",()=>{
        const string="[MSG:Reset to continue]";

        const message=sut.parse(string);

        const expected={
            type:"feedback",
            payload:{
                message:'Reset to continue'
            }
        }
        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);
    });

    test("parsea gcode parser state",()=>{
        const string="[GC:G0 G54 G17 G21 G90 G94 M5 M9 T0 F0.0 S0]";

        const message=sut.parse(string);

        const expected={
            type:'gcodeParserState',
            payload:{
                value:"G0 G54 G17 G21 G90 G94 M5 M9 T0 F0.0 S0"
            }
        }
        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);
    });

    test("parsea help",()=>{
        const string="[HLP:$$ $# $G $I $N $x=val $Nx=line $J=line $C $X $H ~ ! ? ctrl-x]";

        const message=sut.parse(string);

        const expected={
            type:"help",
            payload:{
                value:"$$ $# $G $I $N $x=val $Nx=line $J=line $C $X $H ~ ! ? ctrl-x"
            }
        }
        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);

    });

    test("parsea gcodeValue",()=>{
        const string="[G58:1.300,0.000,2.030]";

        const message=sut.parse(string);

        const expected={
            type:"gcodeValue",
            payload:{
                gcode:58,
                value:{
                    x:1.300,
                    y:0.000,
                    z:2.030
                }
            }
        }
        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);

    })

    test("parsea tool length offset",()=>{
        const string="[TLO:3.200]";

        const message=sut.parse(string);
        const expected={
            type:"toolLengthOffset",
            payload:{
                value:3.200
            }
        }
        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);
    })

    test("parsea probe",()=>{
        const string="[PRB:0.100,0.200,0.300:1]";
        const message=sut.parse(string);

        const expected={
            type: "probe",
            payload:{
                value:{
                    x: 0.1,
                    y: 0.2,
                    z: 0.3
                },
                lastProbeCicleSuccessful: true
            }
        }
        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);
    })

    test("parsea version",()=>{
        const string="[VER:1.1d.20161014:foo]";
        const message=sut.parse(string);
        const expected={
            type:"version",
            payload:{
                version:"1.1d.20161014",
                string:"foo"
            }
        }
        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);
    })

    test("parsea options",()=>{
        const string="[OPT:VL,15,128]";
        const message=sut.parse(string);
        const expected={
            type:"options",
            payload:{
                options:"VL,15,128"
            }
        }
        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);
    })

    test("echo",()=>{
        const string="[echo:G1X0.540Y10.4F100]";
        const message=sut.parse(string);
        const expected={
            type:"echo",
            payload:{
                block:"G1X0.540Y10.4F100"
            }
        }
        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);

    })

    test("Startup Line Execution ok",()=>{
        const string=">G54G20:ok";
        const message=sut.parse(string);
        const expected={
            type:"startupLineExecution",
            payload:{
                block: "G54G20",
                ok: true,
                lineError: null
            }
        }
        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);

    })

    test("Startup Line Execution ok",()=>{
        const string=">:error:7";
        const message=sut.parse(string);
        const expected={
            type:"startupLineExecution",
            payload:{
                block: null,
                ok: false,
                lineError: 7
            }
        }
        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);

    })

    test("statusReport",()=>{
        const string="<Idle|MPos:0.000,0.200,0.000|WCO:0.000,0.000,3.000|FS:0,0>";
        const message=sut.parse(string);

        const expected={
            type: "statusReport",
            payload:{
                state: "Idle",
                values:{
                    FS:"0,0",
                },
                vectors:{
                    MPos:{
                        x:0.000,
                        y:0.200,
                        z:0.000
                    },
                    WCO:{
                        x:0.000,
                        y:0.000,
                        z:3.000
                    }
                }
            }
        }
        expect(message).toStrictEqual(expected);
        const good=message as GrblResponse;

        expect(sut.compose(good)).toStrictEqual(string);
    })
});
