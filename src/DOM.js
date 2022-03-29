/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        let elem = document.createElement(tag);
        elem.textContent = content;
        document.body.append(elem);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    let counts = 0,
        elems = [];
    for (let i = 0; i < level; i++) {
        let countsPrev = counts,
            k = 0;
        counts += childrenCount ** i;
        for (let j = countsPrev; j < counts; j++) {
            elems[j] = document.createElement('div');
            elems[j].classList.add('item_' + (i + 1));
            if (i > 0) {
                if (k < childrenCount) {
                    k++;
                } else {
                    k = 1;
                    --countsPrev;
                }
                elems[countsPrev - 1].append(elems[j]);
            }
        }
    }
    return elems[0];
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let tree = generateTree(2, 3);
    [].forEach.call(tree.querySelectorAll('div.item_2'), function (divItem) {
        var section = document.createElement('section');
        section.classList.add(divItem.className);
        section.innerHTML = divItem.innerHTML;
        divItem.parentNode.replaceChild(section, divItem);
    });
    return tree;
}
