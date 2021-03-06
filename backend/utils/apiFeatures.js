class APIFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};
      this.query=this.query.find({...keyword});
      return this;
  }
  filter(){
      const queryCopy={...this.querystr};

      
      const removeFields=['keyword','limit','page']
      removeFields.forEach(el=>delete queryCopy[el]);
      
      console.log(queryCopy);
      
      let querystr=JSON.stringify(queryCopy);
      querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`);
      
      console.log(queryCopy);

      this.query=this.query.find(JSON.parse(querystr));
      return this;
  }
  pagination(resPerPage){
      const currentPage=Number(this.querystr.page)||1;
      const skip = resPerPage*(currentPage-1);

      this.query=this.query.limit(resPerPage).skip(skip);
      return this
  }
}
module.exports=APIFeatures
