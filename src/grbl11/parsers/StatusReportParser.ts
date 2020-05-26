import { parseStartEnd, MessageParser } from '../../parsers/parser';
import { StatusReport, StatusReportPayload, vectorFields } from '../responses';
import { composePositionVector, parsePositionVector } from '../../parsers/vector';

export default class StatusReportParser implements MessageParser<StatusReport> {
  type = 'statusReport';

  parse(message: string): StatusReport | undefined {
    return parseStartEnd(message, {
      start: '<',
      end: '>',
      type: 'statusReport',
      parsePayload(payload: string) {
        const values: string[] = payload.split('|');
        const initialAcumulator = {
          state: values[0],
          vectors: {},
          values: {},
        };

        const ret = values.reduce<StatusReportPayload>((acumulator, value, index, array) => {
          if (index === 0) {
            return acumulator;
          }
          const separado = value.split(':');
          const field = separado[0];

          const newVectors = { ...acumulator.vectors };
          const newValues = { ...acumulator.values };
          if (vectorFields.includes(field)) {
            newVectors[field] = parsePositionVector(separado[1]);
          } else {
            newValues[field] = separado[1];
          }
          return Object.assign({}, acumulator, {
            vectors: newVectors,
            values: newValues,
          });
        }, initialAcumulator);
        return ret;
      },
    });
  }

  compose(obj: StatusReport): string {
    return (
      '<' +
      obj.payload.state +
      Object.keys(obj.payload.vectors).reduce((acumulador, field) => {
        const fieldValue = composePositionVector(obj.payload.vectors[field]);
        return acumulador + '|' + field + ':' + fieldValue;
      }, '') +
      Object.keys(obj.payload.values).reduce((acumulador, field) => {
        const fieldValue = obj.payload.values[field];
        return acumulador + '|' + field + ':' + fieldValue;
      }, '') +
      '>'
    );
  }
}
