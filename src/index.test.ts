describe('some test example', () => {

    beforeAll(() => {
        console.log('Start tests');
    });

    afterAll(() => {
        console.log('End tests');
    });

    test('asserts Math.pow is working', () => {
        expect(Math.pow(5, 2)).toBe(25);
        expect(Math.pow(5, 2)).not.toBe(50);
    });

});