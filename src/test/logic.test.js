const {noteCheck1,noteCheck2,noteCheck3,noteCheck4,noteCheck5} = require('../Logic/logic');


describe('Tests the props from Note', ()=>{
	test('x exists',()=>{
		expect(noteCheck1(true)).toBe(true)
	})
	test('y exists',()=>{
		expect(noteCheck2(true)).toBe(true)
	})
	test('w exists',()=>{
		expect(noteCheck3(true)).toBe(true)
	})
	test('h exists',()=>{
		expect(noteCheck4(true)).toBe(true)
	})
	test('masterId exists',()=>{
		expect(noteCheck5(true)).toBe(true)
	})
})


//Adams tests
const {weatherCheck1,weatherCheck2,weatherCheck3,weatherCheck4,weatherCheck5} = require('../Logic/logic');


describe('Tests the props from weather', ()=>{
	test('x exists',()=>{
		expect(weatherCheck1(true)).toBe(true)
	})
	test('y exists',()=>{
		expect(weatherCheck2(true)).toBe(true)
	})
	test('w exists',()=>{
		expect(weatherCheck3(true)).toBe(true)
	})
	test('h exists',()=>{
		expect(weatherCheck4(true)).toBe(true)
	})
	test('masterId exists',()=>{
		expect(weatherCheck5(true)).toBe(true)
	})
})
