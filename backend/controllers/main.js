const getTableData = (req, res, db, tb, search, searchField) => {
  const qry = db.select('*').from(tb);
  if(search != null) {
    qry.where(searchField, 'like', '%'+ search +'%').orWhere(searchField, 'like', ''+ search +'%').orWhere(searchField, 'like', '%'+ search +'')
  }
  console.log(qry);
  qry.orderBy('id', 'asc')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postTableData = (req, res, db, tb) => {
  if(tb === 'users') {
    const { first, last, email, phone, location, hobby } = req.body
    const added = new Date()
    db(tb).insert({first, last, email, phone, location, hobby, added})
      .returning('*')
      .then(item => {        
        const userid = item[0].id;
        const groupid = req.body.group;
        db('users_groups').insert({userid, groupid, added})
          .returning('*')
          .then(group => {
            //res.json(item)
          })
          .catch(err => res.status(400).json({dbError: 'db error'}))
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  } else {
    const { name } = req.body
    const added = new Date()
    db(tb).insert({name, added})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
}

const putTableData = (req, res, db, tb) => {
  if(tb === 'users') {
    const { id, first, last, email, phone, location, hobby } = req.body
    db(tb).where({id}).update({first, last, email, phone, location, hobby})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
  } else {
    const { id, name } = req.body
    db(tb).where({id}).update({name})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
}

const deleteTableData = (req, res, db, tb) => {
  const { id } = req.body
  if(tb === 'groups') {
    db('users_groups').where({groupid: id}).select()
    .then(items => {
      if(items.length){
        res.json({dataExists: 'true'})
      } else {
        db(tb).where({id}).del()
        .then(() => {
          res.json({delete: 'true'})
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({dbError: 'db error'})
        
    })    
  } else {
    db('users_groups').where({userid : id}).del()
      .then(() => {
        db(tb).where({id}).del()
        .then(() => {
          res.json({delete: 'true'})
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))

      })
      .catch(err => res.status(400).json({dbError: 'db error'}))    
  }
}

const getGroupsOfUsers = (id, res, db, tb) => {
  db('groups').join('users_groups', 'groups.id', 'users_groups.groupid').where({userid: id}).select()
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({dbError: 'db error'})
        
    })
}

const getUsersOfGroup = (id, res, db, tb) => {
  db('users').join('users_groups', 'users.id', 'users_groups.userid').where({groupid: id}).select()
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({dbError: 'db error'})
        
    })
}

const addGroupsOfUsers = (req, res, db) => {

  let userid = req.body.userId;
  db('users_groups').where({userid : userid}).del()
  .then(() => {
    req.body.data.forEach(function (item){
      const { userid, groupid } = item
      const added = new Date()
      
      db('users_groups').insert({userid, groupid, added})
        .returning('*')
        .then(group => {
          //res.json(group)
        })
        .catch()
    })
    res.json({success: 'true'})
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))
  
}

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
  getGroupsOfUsers,
  getUsersOfGroup,
  addGroupsOfUsers
}