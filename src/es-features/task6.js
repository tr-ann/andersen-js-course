/**
 * Просто преобразовать содержимое функции task6Old под современный код
 *
 * Пример вызова
 * console.log(task6Old()); -> ['Max', 100, 'Admin', false, '1']
 */

export function task6Old() {
  function userModule() {
    return {
      name: 'Max',
      value: 100,
      role: { name: 'Admin' },
      cases: [{ id: '1' }],
    };
  }

  var tmp = userModule();
  var name = tmp.name;
  var value = tmp.value;
  var role = tmp.role.name;
  var isActive = tmp.isActive === undefined ? false : tmp.isActive;
  var firstCaseId = tmp.cases[0].id;

  return [name, value, role, isActive, firstCaseId];
}

// Напишите реализацию функции task6Old на ES6+ ниже этого комментария.
// При желании, можете использовать стрелочную функцию, вместо обычной

export function task6New() {
  function userModule() {
    return {
      name: 'Max',
      value: 100,
      role: { name: 'Admin' },
      cases: [{ id: '1' }],
    };
  }

  // если нет разницы в каком порядке будут выведены свойства,
  // то лучше использовать эту функцию
  /* function getValues(obj) {
    const values = Object.values(obj);

    for (let i = 0; i < values.length; ) {
      if (typeof values[i] === 'object') {
        values.splice(i, 1, ...Object.values(values[i]));
      } else {
        i++;
      }
    }
    values.push(Boolean(obj.isActive));

    return values;
  } */

  const tmp = userModule();

  const name = tmp.name;
  const value = tmp.value;
  const role = tmp.role.name;
  const isActive = Boolean(tmp.isActive);
  const firstCaseId = tmp.cases[0].id;

  return [name, value, role, isActive, firstCaseId];
}
