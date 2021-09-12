import { checkStringLength } from '../utils';

describe('Utility functions', () => {
    it('check checkStringLength function', () => {
        const result = checkStringLength('123456789', 5);

        expect(result).toEqual('ERROR: max length is 5');
    });

})