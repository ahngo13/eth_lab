class App extends React.Component{ 
    state={
        show : true
    } 
    
    login = ()=>{        
        //alert(this.id.value +':'+ this.pw.value);
        axios.post('/member/login',{id:this.id.value, pw:this.pw.value})
        .then((res)=>{
            console.log(res);
            this.setState({
                show:false,
                total:0,
                totalTo:0
            });
        })
        .catch((error)=>{console.log(error)});
    } 
    spon_add = ()=>{        
        alert(this.amount.value );
        axios.post('/spon/add',{amount:this.amount.value, address:this.address.value})
        .then((res)=>{
            console.log(res.data.msg);
            this.setState({
                total:res.data.msg,
                totalTo: res.data.msgTo
            });
        })
        .catch((error)=>{console.log(error)});
    } 
    render(){
     
        return(
            <div>
                <h1>Welcome Sponsor~!</h1>
                <div className={this.state.show ? '' : 'hidden'}>
                    ID<input type="text" ref={ref=>this.id=ref}></input><br/>
                    PW<input type="text" ref={ref=>this.pw=ref}></input><br/>
                    <button onClick={this.login} >로그인</button>
                </div>
                <div className={this.state.show ? 'hidden' : ''}>                    
                    후원금<input type="text" ref={ref=>this.amount=ref}></input><br/>
                    후원자 주소<input type="text" ref={ref=>this.address=ref}></input><br/>
                    <button onClick={this.spon_add} >후원하기</button>
                    <br/>보낸사람 잔고 : {this.state.total}
                    <br/>받은사람 잔고 : {this.state.totalTo}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('here'));
