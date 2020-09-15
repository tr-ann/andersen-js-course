const urls = [
  'http://www.json-generator.com/api/json/get/cevhxOsZnS',
  'http://www.json-generator.com/api/json/get/cguaPsRxAi',
  'http://www.json-generator.com/api/json/get/cfDZdmxnDm',
  'http://www.json-generator.com/api/json/get/cfkrfOjrfS',
  'http://www.json-generator.com/api/json/get/ceQMMKpidK',
];

// eslint-disable-next-line import/prefer-default-export
export function parallel() {
  Promise.all(urls.map(url => fetch(url).then(res => res.json()))).then(data => {
    console.log('parallel');
    console.log(data);
  });
}

export function sequential() {
  const result = [];

  fetch(urls[0])
    .then(res1 => res1.json())
    .then(data => {
      result.push(data);
      return fetch(urls[1]);
    })
    .then(res2 => res2.json())
    .then(data => {
      result.push(data);
      return fetch(urls[2]);
    })
    .then(res3 => res3.json())
    .then(data => {
      result.push(data);
      return fetch(urls[3]);
    })
    .then(res4 => res4.json())
    .then(data => {
      result.push(data);
      return fetch(urls[4]);
    })
    .then(res5 => res5.json())
    .then(data => {
      result.push(data);
      console.log('sequential');
      console.log(result);
    });
}

// есть еще вот такая общая реализация. Что думаете?
/* const f = urls => {
  const results = [];
  return urls.reduce(
    // eslint-disable-next-line no-shadow
    (fetchRes, url, index, urls) => {
      switch (index + 1) {
        case urls.length:
          // eslint-disable-next-line no-shadow
          return fetchRes.then(results => results);
        case urls.length - 1:
          return fetchRes.then(res => {
            results.push(res);
            return results;
          });
        default:
          return fetchRes.then(res => {
            results.push(res);
            return fetch(urls[index + 2]);
          });
      }
    },
    fetch(urls[0]).then(res => {
      results.push(res);
      return fetch(urls[1]);
    })
  );
}; 

foo(urls).then(res => console.log(res));
*/
