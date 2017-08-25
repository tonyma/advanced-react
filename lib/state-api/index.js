import debounce from 'lodash.debounce';

class StateApi{
  constructor(rawData){
    this.data={
      articles:this.mapIntoObject(rawData.articles),
      authors:this.mapIntoObject(rawData.authors),
      searchTerm:''
    };
    this.rawData = rawData;
    this.subscriptions={};
    this.lastSubscriptionId=0;
  }
 mapIntoObject(arr){
    return arr.reduce((acc,curr)=>{
      acc[curr.id]=curr;
      return acc
    },{});
  }
  lookupAuthor=authorId=>{
    return this.data.authors[authorId];
  }
  getState=()=>{
    return this.data;
  };
  subscribe=(cb)=>{
    this.lastSubscriptionId++;
    this.subscriptions[this.lastSubscriptionId]=cb;
    return this.lastSubscriptionId;
  };
  unsubscribe=(subscriptionId)=>{
    delete this.subscriptions[subscriptionId];
  };

  noticeSubscriber=()=>{
    Object.values(this.subscriptions).forEach((cb)=>cb());
  };

  handleSearch=searchTerm=>{
    this.data.searchTerm = searchTerm;
    this.noticeSubscriber();
  };
}

export default StateApi;
