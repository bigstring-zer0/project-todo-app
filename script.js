// create-btn 이라는 id를 가진 요소를 createBtn에 저장
const createBtn = document.getElementById('create-btn');
// list라는 id를 가진 요소를 list에 저장
const list = document.getElementById('list')

// 생성한 todo를 저장하기 위한 todos 배열 생성
let todos = [];

// createBtn 요소를 클릭하면 createNewTodo 함수를 호출
createBtn.addEventListener('click', createNewTodo)

function createNewTodo() {
    // 새로운 아이템 객체 생성
    const item = {
        id : new Date().getTime,
        text: '',
        complete: false
    }

    // todos 배열의 첫 인덱스에 새로운 아이템 추가
    todos.unshift(item);

    // 요소 생성하기
    const {
        itemElement,
        inputElement,
        editBtnElement,
        removeBtnElement
    } = createTodoElement(item)

    // list 요소 안에 방금 생성한 아이템 요소 추가
    list.prepend(itemElement);

    // 처음 생성한 요소에는 disabled 속성을 제거
    inputElement.removeAttribute('disabled')

    // 처음 생성한 요소에 클릭하지 않아도, focus를 가게 해서 바로 입력 가능하게 하기
    inputElement.focus();

    // 변경된 내용을 로컬스토리지에 업데이트
    saveToLocalStorage();

}

function createTodoElement(item) {
    // 이벤트가 발생하면 div 요소 생성
    const itemElement = document.createElement('div');
    // 해당 요소에 item 클래스 추가
    itemElement.classList.add('item');

    // 이벤트가 발생하면 input 요소를 생성
    const checkboxElement = document.createElement('input');
    // 생성한 input 요소의 타입을 checkbox로 설정
    checkboxElement.type = 'checkbox';
    // 웹페이지가 새로고침 되더라도 item 객체의 complete 필드값에 따라 checkbox가 체크 되있을지 아니면 체크 해제 되어있을지를 정한다.
    checkboxElement.checked = item.complete;

    // item 객체의 complete 필드 값이 true 라면,
    if(item.complete) {
        // 생성한 div 객체에 complete 클래스 추가
        itemElement.classList.add('complete')
    }

    // checkbox의 요소를 클릭했을때 익명 함수 호출
    checkboxElement.addEventListener('change', () => {

        // checkbox 요소가 클릭된 상태에 따라 클릭되어 있으면, true 값을 클릭이 해제되어 있으면 false 값을 item 객체의 complete 필드에 저장.
        item.complete = checkboxElement.checked;

        // 만약 item객체의 complete 값이 true 라면,
        if(item.complete){
            // itemElement 요소의 클래스에 complete 클래스 추가
            itemElement.classList.add('complete');
        }
        // 만약 item객체의 complete 값이 flase 라면,
        else{
            // itemElement 요소의 클래스에 complete 클래스 제거.
            itemElement.classList.remove('complete');
        }
        // 변경된 내용을 로컬스토리지에 업데이트
        saveToLocalStorage();
    })

    // 이벤트가 발생하면 input 요소를 생성한다.
    const inputElement = document.createElement('input')
    // 생성한 input 요소의 타입을 text로 설정한다.
    inputElement.type = 'text';
    // 생성한 input 요소의 값을 item 객체의 text 필드의 값으로 설정
    inputElement.value = item.text;
    // 생성된 input 요소에 타이핑을 방지하기 위해서 disabled 속성값 추가
    inputElement.setAttribute("disabled", "");

    // inputElement 요소에 값을 입력하면 익명 함수 호출
    inputElement.addEventListener('input', () => {
        // inputElement 요소의 값을 item 객체의 text 필드에 저장
        item.text = inputElement.value;
    })

    // inputElement 요소에 값을 입력하면 익명 함수 호출
    inputElement.addEventListener('blur', () => {
        // inputElement 요소에 disabled 속성값 추가
        inputElement.setAttribute('disabled', "");

        // 변경된 내용을 로컬스토리지에 업데이트
        saveToLocalStorage()
    })

    // 이벤트가 발생하면 div 요소를 생성한다.
    const actionsElement = document.createElement('div');
    // 해당 요소에 actions 라는 클래스 추가.
    actionsElement.classList.add('actions');

    // 이벤트가 발생하면 button 요소를 생성한다.
    const editBtnElement = document.createElement('button')
    // 해당 요소에 material-icons 클래스 추가.
    editBtnElement.classList.add('material-icons');
    // 생성된 요소의 텍스트를 edit이라고 설정.
    editBtnElement.innerText = 'edit'; 

    // editBtn 요소를 클릭하면 익명 함수 호출
    editBtnElement.addEventListener('click', () => {
        // 해당 inputElement 요소의 disabled 속성값 제거
        inputElement.removeAttribute('disabled');
        // 해당 inputElement 요소를 클릭하지 않아도 포커스 설정
        inputElement.focus();
    })

    // 이벤트가 발생하면 button 요소를 생성한다.
    const removeBtnElement = document.createElement('button')
    // 해당 요소에 material-icons, remove-btn 클래스 추가.
    removeBtnElement.classList.add('material-icons', 'remove-btn')
    // 생성된 요소의 텍스트를 remove_circle이라고 설정.
    removeBtnElement.innerText = 'remove_circle';

    removeBtnElement.addEventListener('click', () => {
        // 지우기 버튼을 클릭했을때 클릭된 해당 요소의 id와 다른 item 객체만 todos 배열에다가 저장해라.
        // 한마디로 지우려는 요소만 todos 배열에서 제거하고 나머지 객체들만 todos 배열에 저장해라는 의미다. 
        todos = todos.filter(t => t.id != item.id);

        // 지우기 버튼을 클릭한 아이템 요소 제거
        itemElement.remove();
        // 변경된 내용을 로컬스토리지에 업데이트
        saveToLocalStorage()
    })

    // const itemElement = createItemElement()
    // const checkboxElement = createCheckboxElement();
    // const inputElement = createInputElement();
    // const actionsElement = createActionsElement();
    // const editBtnElement = createEditBtnElement();
    // const removeBtnElement = createRemoveBtnElement();

    // 위에서 이벤트가 발생하면 해당 요소를 생성하기만 했으므로, 각 요소에 알맞게 위치시켜 준다.
    actionsElement.append(editBtnElement);
    actionsElement.append(removeBtnElement);

    itemElement.append(checkboxElement);
    itemElement.append(inputElement);
    itemElement.append(actionsElement);

    // 이벤트가 발생하여 생성한 요소들을 반환
    return {
        itemElement,
        inputElement,
        editBtnElement,
        removeBtnElement
    }
}

// todos 값들을 출력
displayTodos();

// 이벤트가 발생하면 변경된 값들을 로컬스토리지에 업데이트
function saveToLocalStorage() {
    // todos 배열의 값을 String으로 변경
    const data = JSON.stringify(todos);
    // 변경된 todo 값을 로컬스토리지에 저장
    localStorage.setItem("my_todos", data);
}

// 로컬스토리지에서 데이터 불러오기
function loadFromLocalStorage() {
    // 로컬스토리지에서 my_todos 라는 키값을 가진 데이터를 data에 저장
    const data = localStorage.getItem('my_todos');

    // 만약 data에 어떤 값이 저장되어 있다면,
    if (data) {
        // data에 저장되어 있는 값을 todos에 저장되어있는 객체의 필드 값에 각각 파싱하여 todos에 저장
        todos = JSON.parse(data);
    }
}

// 작성한 todos 값들을 출력
function displayTodos() {
    // 로컬스토리지에서 데이터 불러오기
    loadFromLocalStorage();

    // 로컬 스토리지에서 불러온 todos 배열의 원소들을 탐색
    for (let i = 0; i < todos.length; i++) {
        // todos 배열에 저장되어있는 원소 한개를 item에 저장
        const item = todos[i];

        // item에 저장되어 있는 값들을 바탕으로 todo 요소 하나를 생성하여, itemElement에 저장
        const { itemElement } = createTodoElement(item);
        
        // list id를 가진 요소에 해당 ItemElement를 추가.
        list.append(itemElement);
    }
}

function createItemElement() { 
    // 이벤트가 발생하면 div 요소 생성
    const itemElement = document.createElement('div');
    // 해당 요소에 item 클래스 추가
    itemElement.classList.add('item');

    return itemElement;
    
    
}

function createCheckboxElement() {
    // 이벤트가 발생하면 input 요소를 생성
    const checkboxElement = document.createElement('input');
    // 생성한 input 요소의 타입을 checkbox로 설정
    checkboxElement.type = 'checkbox';
    // 웹페이지가 새로고침 되더라도 item 객체의 complete 필드값에 따라 checkbox가 체크 되있을지 아니면 체크 해제 되어있을지를 정한다.
    checkboxElement.checked = item.complete;

    // item 객체의 complete 필드 값이 true 라면,
    if(item.complete) {
        // 생성한 div 객체에 complete 클래스 추가
        itemElement.classList.add('complete')
    } 

    // checkbox의 요소를 클릭했을때 익명 함수 호출
    checkboxElement.addEventListener('change', () => {

        // checkbox 요소가 클릭된 상태에 따라 클릭되어 있으면, true 값을 클릭이 해제되어 있으면 false 값을 item 객체의 complete 필드에 저장.
        item.complete = checkboxElement.checked;

        // 만약 item객체의 complete 값이 true 라면,
        if(item.complete){
            // itemElement 요소의 클래스에 complete 클래스 추가
            itemElement.classList.add('complete');
        }
        // 만약 item객체의 complete 값이 flase 라면,
        else{
            // itemElement 요소의 클래스에 complete 클래스 제거.
            itemElement.classList.remove('complete');
        }
        // 변경된 내용을 로컬스토리지에 업데이트
        saveToLocalStorage();
    });

    return checkboxElement;
}

function createInputElement() { 
    // 이벤트가 발생하면 input 요소를 생성한다.
    const inputElement = document.createElement('input')
    // 생성한 input 요소의 타입을 text로 설정한다.
    inputElement.type = 'text';
    // 생성한 input 요소의 값을 item 객체의 text 필드의 값으로 설정
    inputElement.value = item.text;
    // 생성된 input 요소에 타이핑을 방지하기 위해서 disabled 속성값 추가
    inputElement.setAttribute("disabled", ""); 

    // inputElement 요소에 값을 입력하면 익명 함수 호출
    inputElement.addEventListener('input', () => {
        // inputElement 요소의 값을 item 객체의 text 필드에 저장
        item.text = inputElement.value;
    })

    // inputElement 요소에 값을 입력하면 익명 함수 호출
    inputElement.addEventListener('blur', () => {
        // inputElement 요소에 disabled 속성값 추가
        inputElement.setAttribute('disabled', "");

        // 변경된 내용을 로컬스토리지에 업데이트
        saveToLocalStorage()
    });

    return inputElement;


}

function createActionsElement(){ 
    // 이벤트가 발생하면 div 요소를 생성한다.
    const actionsElement = document.createElement('div');
    // 해당 요소에 actions 라는 클래스 추가.
    actionsElement.classList.add('actions');

    return actionsElement;

}

function createEditBtnElement() { 
    // 이벤트가 발생하면 button 요소를 생성한다.
    const editBtnElement = document.createElement('button')
    // 해당 요소에 material-icons 클래스 추가.
    editBtnElement.classList.add('material-icons');
    // 생성된 요소의 텍스트를 edit이라고 설정.
    editBtnElement.innerText = 'edit';

    // editBtn 요소를 클릭하면 익명 함수 호출
    editBtnElement.addEventListener('click', () => {
        // 해당 inputElement 요소의 disabled 속성값 제거
        inputElement.removeAttribute('disabled');
        // 해당 inputElement 요소를 클릭하지 않아도 포커스 설정
        inputElement.focus();
    });

    return editBtnElement;

    
}

function createRemoveBtnElement() { 
     // 이벤트가 발생하면 button 요소를 생성한다.
     const removeBtnElement = document.createElement('button')
     // 해당 요소에 material-icons, remove-btn 클래스 추가.
     removeBtnElement.classList.add('material-icons', 'remove-btn')
     // 생성된 요소의 텍스트를 remove_circle이라고 설정.
     removeBtnElement.innerText = 'remove_circle'; 

     removeBtnElement.addEventListener('click', () => {
        // 지우기 버튼을 클릭했을때 클릭된 해당 요소의 id와 다른 item 객체만 todos 배열에다가 저장해라.
        // 한마디로 지우려는 요소만 todos 배열에서 제거하고 나머지 객체들만 todos 배열에 저장해라는 의미다. 
        todos = todos.filter(t => t.id != item.id);

        // 지우기 버튼을 클릭한 아이템 요소 제거
        itemElement.remove();
        // 변경된 내용을 로컬스토리지에 업데이트
        saveToLocalStorage()
    })

    return removeBtnElement;

}