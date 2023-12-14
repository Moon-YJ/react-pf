import { combineReducers } from 'redux';

const initMember = {
	members: [
		{
			name: 'David',
			position: 'President',
			pic: 'member1.jpg'
		},
		{
			name: 'Julia',
			position: 'Vice President',
			pic: 'member2.jpg'
		},
		{
			name: 'Emily',
			position: 'UI Designer',
			pic: 'member3.jpg'
		},
		{
			name: 'Michael',
			position: 'Front-end Developer',
			pic: 'member4.jpg'
		},
		{
			name: 'Emma',
			position: 'Back-end Developer',
			pic: 'member5.jpg'
		},
		{
			name: 'Peter',
			position: 'Project Manager',
			pic: 'member6.jpg'
		}
	]
};

// 초기 데이터 값을 state로 지정하고 추후 action 객체가 넘어오면 action의 타입에 따라 해당 데이터를 변경해주는 변형자 함수
// {type: 'SET_MEMBERS, payload: [변경할 데이터 배열]}
const memberReducer = (state = initMember, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

/*
  const memberReducer = (state = initMember, action) => {
    if(action.type === 'SET_MEMBERS') {
      return {...state, members: action.payload}
    } else {
      return state;
    }
  }
*/

// 해당 파일에서 내보내는 여러개의 reducer 객체를 합쳐서 외부로 export
const reducers = combineReducers({ memberReducer });
export default reducers;
