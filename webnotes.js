/**
 * Created by zj on 2015/9/12.
 */

function showDialyList(){

    db=openDatabase('DialyManage','','收藏夹管理系统',10*1024*1024);

    if(db)
    {

        db.transaction(function(tx){
            tx.executeSql('select * from siteinfo',[],
                function(tx,rs){
                    var strHTML="";
                    if(rs.rows.length>0)
                    {

                        for(var i=0;i<rs.rows.length;i++)
                        {
                            var intid=rs.rows.item(i).id;
                            strHTML+="<tr>";
                            strHTML+="<td>"+intid+"</td>";
                            strHTML+="<td>"+rs.rows.item(i).name+"</td>";
                            strHTML+="<td>"+rs.rows.item(i).url+"</td>";
                            strHTML+="<td>"+rs.rows.item(i).memo+"</td>";
                            strHTML+="<td><a href='javascript:showeditDialy("+intid+")'>edit</a>&nbsp;&nbsp;&nbsp;";
                            strHTML+="<a href='javascript:deleteDialy("+intid+")'>delete</a></td>";
                            strHTML+="</tr>";
                        }

                    }
                    else{

                        strHTML+="<tr><td colspan=5><center>there is no item now</center></td></tr>";
                    }
                    document.getElementById("list").innerHTML=strHTML;
                },
                function(tx,ex){
                    document.getElementById("pstate").innerHTML="can't find that table:"+ex.message;
                }
            )
        });
    }

}


function btnAddDialy()
{
    var addid=document.getElementById("siteid").value;
    var addname=document.getElementById("sitename").value;
    var addurl=document.getElementById("siteurl").value;
    var addtext=document.getElementById("sitetext").value;
    db=openDatabase('DialyManage','','收藏夹管理系统',10*1024*1024);
    if(db)
    {
        var addsql="insert into siteinfo values(?,?,?,?)";
        db.transaction(function (tx) {
            tx.executeSql('create table if not exists siteinfo(id unique,name text,url text,memo text)');
            tx.executeSql(addsql,[addid,addname,addurl,addtext],
                function(){document.getElementById("pstate").innerHTML="insert one item sucess";showDialyList();},
                function(tx,ex){document.getElementById("pstate").innerHTML="insert one item wrong:"+ex.message;}
            )
        });
    }

}



function showeditDialy(id)
{
    db=openDatabase('DialyManage','','日志管理系统',10*1024*1024);
    if(db)
    {
        db.transaction(function (tx) {
            tx.executeSql("select * from siteinfo where id='"+id+"'",[],
                function (tx,rs) {
                    document.getElementById("siteid").value=rs.rows.item(0).id;
                    document.getElementById("sitename").value=rs.rows.item(0).name;
                    document.getElementById("siteurl").value=rs.rows.item(0).url;
                    document.getElementById("sitetext").value=rs.rows.item(0).memo;
                    document.getElementById("pstate").innerHTML="sucess to show this item";
                },
                function(tx,ex){
                    document.getElementById("pstate").innerHTML="can't get this item:"+ex.message;
                }
            )
        });
    }
}



function editDialy()
{
    db=openDatabase('DialyManage','','收藏夹管理系统',10*1024*1024);
    var editid=document.getElementById('siteid').value;
    var editname=document.getElementById('sitename').value;
    var editurl=document.getElementById('siteurl').value;
    var edittext=document.getElementById('sitetext').value;

    var editsql="update siteinfo set name=?,url=?,memo=? where id=?";

    if(db)
    {
        db.transaction(function (tx) {
            tx.executeSql(editsql,[editname,editurl,edittext,editid],
                function(){
                    showDialyList();
                    document.getElementById('pstate').innerHTML="sucess to edit";
                },
                function(tx,ex){document.getElementById('pstate').innerHTML="wrong to update item:"+ex.message;}

            );
        });
    }
}

function deleteDialy(delid)
{
    db=openDatabase('DialyManage','','收藏夹管理系统',10*1024*1024);
    var delsql="delete from siteinfo";
    if(delid!=0)
    {
        delsql="delete from siteinfo where id='"+delid+"'";
    }
    if(db)
    {
        db.transaction(function(tx){
            tx.executeSql(delsql,[],
                function(){
                    showDialyList();
                    document.getElementById("pstate").innerHTML="sucess to delete item";
                },
                function(tx,ex){
                   document.getElementById("pstate").innerHTML="wrong to delete item:"+ex.message;
                }
            );
        });
    }
}



















