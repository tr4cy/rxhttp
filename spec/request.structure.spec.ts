import { HttpRequest } from './../src/httprequest';
import { TestScheduler } from 'rxjs/testing';
import { throttleTime } from 'rxjs/operators';

const scheduler = new TestScheduler((actual, expected) => {
  // asserting the two objects are equal
  // e.g. using chai.
  expect(actual).toBe(expected);
});

describe('HttpRequest<TestDataType>', () => {
  const fakeRet = { 'id': 11, 'name': 'mike' }
  const httpReq_Simple = new HttpRequest<any>('http://localhost/fake');
  const httpReq_Stream = new HttpRequest<any>('http://localhost/fake');

  beforeAll(() => {
    spyOn(httpReq_Simple, '_fetch').and.callFake(() => {
      return new Promise((resolve, _reject) => {
        resolve({ json: () => fakeRet });
      })

    });

    spyOn(httpReq_Stream, '_fetch').and.callFake(() => {
      return new Promise((resolve, _reject) => {
        resolve({ json: () => fakeRet });
        resolve({ json: () => fakeRet });
      })

    });

  });

  it('can complete a simple request/response cycle', (done) => {
    httpReq_Simple
      .fetch()
      .subscribe((response) => {
        expect(response).toBe(fakeRet);
        done();
      });

  });

});