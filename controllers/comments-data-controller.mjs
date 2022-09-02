export default function initExpenseDataController(db) {
  // retrieve the following data from db:
  // categories, payee, paymentmode
  const retrieveCommentsData = async (req, res) => {
    try {
      const { expenseIdData } = req.body;
      console.log('this is expense ID', expenseIdData);
      // retrieve comments

      const retrieveComments = await db.Comment.findAll({
        where: {
          expenseId: expenseIdData,
        },
      });
      // send final data back to display comments on the expense detail
      console.log('retrieve comments', retrieveComments);
      res.send(retrieveComments);
    }
    catch (error) {
      console.log(error);
    }
  };

  const addComment = async (req, res) => {
    try {
      // add comments
      const addedComment = await db.Comment.create({
        userId: req.body.userId,
        expenseId: req.body.expenseIdData,
        comment: req.body.comment,
      });

      console.log('added comment', addedComment);
      res.send('comment added!');
    }
    catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (req, res) => {
    try {
      // delete comments

      const deletedComment = await db.Comment.destroy({
        where: {
          id: req.body.id,
        },
      });
      // send final data back to display comments on the expense detail
      console.log('deleted comment', deletedComment);
      res.send('deleted comment');
    }
    catch (error) {
      console.log(error);
    }
  };

  return ({
    retrieveCommentsData, addComment, deleteComment,
  });
}
