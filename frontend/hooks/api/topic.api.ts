import authApi from './axios.authorization.instance';

function getMainList(setFunc: Function) {
  authApi('/topic/mainList').then((res) => {
    setFunc(res.data);
  });
}
export { getMainList };
