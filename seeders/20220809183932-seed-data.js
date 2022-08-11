module.exports = {
  up: async (queryInterface) => {
    // Define user data
    const userData = [
      {
        username: 'John',
        email: 'john@gmail.com',
        password: 'password',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'Mary',
        email: 'mary@gmail.com',
        password: 'password',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'Peter',
        email: 'peter@gmail.com',
        password: 'password',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'Ruth',
        email: 'ruth@gmail.com',
        password: 'password',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'Simon',
        email: 'simon@gmail.com',
        password: 'password',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert users, returning=true,
    // and destructure the returned results array, for use in userWorkspaceData
    const [johnUser, maryUser, peterUser, ruthUser, simonUser] =
      await queryInterface.bulkInsert('users', userData, {
        returning: true,
      });

    // Define workspace data
    const workspaceData = [
      {
        name: "Peter's & Mary's expenses",
        purpose: 'couple expense tracker',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "John's & Simon's Workplace",
        purpose: 'workplace expense tracker',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Ruth's & Simon's Business",
        purpose: 'business expense tracker',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert workspaces, returning=true,
    // and destructure the returned results array, for use in userWorkspaceData
    const [workspacePeterMary, workspaceJohnSimon, workspaceRuthSimon] =
      await queryInterface.bulkInsert('workspaces', workspaceData, {
        returning: true,
      });

    // Define user data
    const authorityData = [
      {
        type: 'Editing',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: 'Viewing',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert workspace_authorities, returning=true,
    // and destructure the returned results array, for use in userWorkspaceData
    const [edit, view] = await queryInterface.bulkInsert(
      'workspace_authorities',
      authorityData,
      {
        returning: true,
      }
    );

    // Define user workspace data based on generated users and workspaces and authorities
    const userWorkspaceData = [
      // For John
      {
        user_id: johnUser.id,
        workspace_id: workspaceJohnSimon.id,
        workspace_authority_id: edit.id,
        income: 5000.1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // For Peter
      {
        user_id: peterUser.id,
        workspace_id: workspacePeterMary.id,
        workspace_authority_id: edit.id,
        income: 4000.1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // For Mary
      {
        user_id: maryUser.id,
        workspace_id: workspacePeterMary.id,
        workspace_authority_id: edit.id,
        income: 3000.1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // For Ruth
      {
        user_id: ruthUser.id,
        workspace_id: workspaceRuthSimon.id,
        workspace_authority_id: edit.id,
        income: 2000.1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // For Simon (Business)
      {
        user_id: simonUser.id,
        workspace_id: workspaceRuthSimon.id,
        workspace_authority_id: view.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // For Simon (Workplace)
      {
        user_id: simonUser.id,
        workspace_id: workspaceJohnSimon.id,
        workspace_authority_id: view.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert user_workspaces, returning=true,
    // and destructure the returned results array, for use in payeeData and expenseData
    const [
      userWsJohn,
      userWsPeter,
      userWsMary,
      userWsRuth,
      userWsSimonBiz,
      userWsSimonWs,
    ] = await queryInterface.bulkInsert('user_workspaces', userWorkspaceData, {
      returning: true,
    });

    // Define payee data
    const payeeData = [
      {
        name: 'Some retail',
        user_ws_id: userWsJohn.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some retail',
        user_ws_id: userWsPeter.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some retail',
        user_ws_id: userWsMary.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some retail',
        user_ws_id: userWsRuth.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some retail',
        user_ws_id: userWsSimonBiz.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some retail',
        user_ws_id: userWsSimonWs.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert payees, returning=true,
    // and destructure the returned results array, for use in expenseData
    const [
      payeeJohn,
      payeePeter,
      payeeMary,
      payeeRuth,
      payeeSimonBiz,
      payeeSimonWs,
    ] = await queryInterface.bulkInsert('payees', payeeData, {
      returning: true,
    });

    // Define category data
    const categoryData = [
      {
        name: 'Some category',
        budget: 100000,
        workspace_id: workspacePeterMary.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some category',
        budget: 500000,
        workspace_id: workspacePeterMary.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some category',
        budget: 600000,
        workspace_id: workspaceJohnSimon.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some category',
        budget: 400000,
        workspace_id: workspaceJohnSimon.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some category',
        budget: 800000,
        workspace_id: workspaceRuthSimon.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some category',
        budget: 900000,
        workspace_id: workspaceRuthSimon.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert categories, returning=true,
    // and destructure the returned results array, for use in expenseData
    const [
      catOnePeterMary,
      catTwoPeterMary,
      catOneJohnSimon,
      catTwoJohnSimon,
      catOneRuthSimon,
      catTwoRuthSimon,
    ] = await queryInterface.bulkInsert('categories', categoryData, {
      returning: true,
    });

    // Define payment mode data
    const payementModeData = [
      {
        name: 'Cash',
        user_id: johnUser.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Credit card',
        user_id: johnUser.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Cash',
        user_id: peterUser.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Credit card',
        user_id: peterUser.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Cash',
        user_id: maryUser.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Credit card',
        user_id: maryUser.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Cash',
        user_id: ruthUser.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Credit card',
        user_id: ruthUser.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Cash',
        user_id: simonUser.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Credit card',
        user_id: simonUser.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert payment modes, returning=true,
    // and destructure the returned results array, for use in expenseData
    const [
      cashJohn,
      creditJohn,
      cashPeter,
      creditPeter,
      cashMary,
      creditMary,
      cashRuth,
      creditRuth,
      cashSimon,
      creditSimon,
    ] = await queryInterface.bulkInsert('payment_modes', payementModeData, {
      returning: true,
    });

    // Define comment data
    const commentData = [
      {
        user_id: johnUser.id,
        comment: 'some comment',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: peterUser.id,
        comment: 'some comment',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: maryUser.id,
        comment: 'some comment',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: ruthUser.id,
        comment: 'some comment',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: simonUser.id,
        comment: 'some comment',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert comments, returning=true,
    // and destructure the returned results array, for use in expenseData
    const [commentJohn, commentPeter, commentMary, commentRuth, commentSimon] =
      await queryInterface.bulkInsert('comments', commentData, {
        returning: true,
      });

    // Define expense data
    const expenseData = [
      {
        user_ws_id: userWsJohn.id,
        category_id: catOneJohnSimon.id,
        payment_mode_id: cashJohn.id,
        payee_id: payeeJohn.id,
        comment_id: commentJohn.id,
        amount: 1000,
        notes: 'some notes',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_ws_id: userWsJohn.id,
        category_id: catTwoJohnSimon.id,
        payment_mode_id: creditJohn.id,
        payee_id: payeeJohn.id,
        comment_id: null,
        amount: 3000,
        notes: 'some notes',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_ws_id: userWsPeter.id,
        category_id: catOnePeterMary.id,
        payment_mode_id: cashPeter.id,
        payee_id: payeePeter.id,
        comment_id: commentPeter.id,
        amount: 2000,
        notes: 'some notes',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_ws_id: userWsPeter.id,
        category_id: catTwoPeterMary.id,
        payment_mode_id: creditPeter.id,
        payee_id: payeePeter.id,
        comment_id: null,
        amount: 3000,
        notes: 'some notes',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_ws_id: userWsMary.id,
        category_id: catTwoPeterMary.id,
        payment_mode_id: creditMary.id,
        payee_id: payeeMary.id,
        comment_id: commentMary.id,
        amount: 3000,
        notes: 'some notes',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_ws_id: userWsMary.id,
        category_id: catOnePeterMary.id,
        payment_mode_id: cashMary.id,
        payee_id: null,
        comment_id: null,
        amount: 3000,
        notes: 'some notes',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_ws_id: userWsRuth.id,
        category_id: catOneRuthSimon.id,
        payment_mode_id: creditRuth.id,
        payee_id: payeeRuth.id,
        comment_id: commentRuth.id,
        amount: 2000,
        notes: 'some notes',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_ws_id: userWsRuth.id,
        category_id: catTwoRuthSimon.id,
        payment_mode_id: cashRuth.id,
        payee_id: payeeRuth.id,
        comment_id: null,
        amount: 2000,
        notes: 'some notes',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_ws_id: userWsSimonBiz.id,
        category_id: catTwoRuthSimon.id,
        payment_mode_id: cashSimon.id,
        payee_id: payeeSimonBiz.id,
        comment_id: commentSimon.id,
        amount: 4000,
        notes: 'some notes',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_ws_id: userWsSimonWs.id,
        category_id: catTwoJohnSimon.id,
        payment_mode_id: creditSimon.id,
        payee_id: payeeSimonWs.id,
        comment_id: null,
        amount: 4000,
        notes: 'some notes',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert category items
    await queryInterface.bulkInsert('expenses', expenseData);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('expenses', null, {});
    await queryInterface.bulkDelete('comments', null, {});
    await queryInterface.bulkDelete('payment_modes', null, {});
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('payees', null, {});
    await queryInterface.bulkDelete('user_workspaces', null, {});
    await queryInterface.bulkDelete('workspace_authorities', null, {});
    await queryInterface.bulkDelete('workspaces', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
