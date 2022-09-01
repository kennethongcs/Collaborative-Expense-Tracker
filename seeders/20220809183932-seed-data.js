module.exports = {
  up: async (queryInterface) => {
    // Define user data
    const userData = [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@gmail.com',
        password: 'cec96aa1b911244e1657b54aadb408d60dcc742b7b3eede48e2fd7708589b048c6f7ac3fa6667e002f9ec80ec4d8d43fe24982a87ffe7f9f72be33fae6e3590c',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Mary',
        last_name: 'Jane',
        email: 'mary@gmail.com',
        password: 'cec96aa1b911244e1657b54aadb408d60dcc742b7b3eede48e2fd7708589b048c6f7ac3fa6667e002f9ec80ec4d8d43fe24982a87ffe7f9f72be33fae6e3590c',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Peter',
        last_name: 'Griffin',
        email: 'peter@gmail.com',
        password: 'cec96aa1b911244e1657b54aadb408d60dcc742b7b3eede48e2fd7708589b048c6f7ac3fa6667e002f9ec80ec4d8d43fe24982a87ffe7f9f72be33fae6e3590c',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Ruth',
        last_name: 'Boaz',
        email: 'ruth@gmail.com',
        password: 'cec96aa1b911244e1657b54aadb408d60dcc742b7b3eede48e2fd7708589b048c6f7ac3fa6667e002f9ec80ec4d8d43fe24982a87ffe7f9f72be33fae6e3590c',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Simon',
        last_name: 'Says',
        email: 'simon@gmail.com',
        password: 'cec96aa1b911244e1657b54aadb408d60dcc742b7b3eede48e2fd7708589b048c6f7ac3fa6667e002f9ec80ec4d8d43fe24982a87ffe7f9f72be33fae6e3590c',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert users, returning=true,
    // and destructure the returned results array, for use in userWorkspaceData
    const [johnUser, maryUser, peterUser, ruthUser, simonUser] = await queryInterface.bulkInsert('users', userData, {
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
    const [workspacePeterMary, workspaceJohnSimon, workspaceRuthSimon] = await queryInterface.bulkInsert('workspaces', workspaceData, {
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
      },
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

    // // Define payee data
    // const payeeData = [
    //   {
    //     name: 'Some retail',
    //     user_workspace_id: userWsJohn.id,
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //   },
    //   {
    //     name: 'Some retail',
    //     user_workspace_id: userWsPeter.id,
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //   },
    //   {
    //     name: 'Some retail',
    //     user_workspace_id: userWsMary.id,
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //   },
    //   {
    //     name: 'Some retail',
    //     user_workspace_id: userWsRuth.id,
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //   },
    //   {
    //     name: 'Some retail',
    //     user_workspace_id: userWsSimonBiz.id,
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //   },
    //   {
    //     name: 'Some retail',
    //     user_workspace_id: userWsSimonWs.id,
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //   },
    // ];

    // // Bulk insert payees, returning=true,
    // // and destructure the returned results array, for use in expenseData
    // const [
    //   payeeJohn,
    //   payeePeter,
    //   payeeMary,
    //   payeeRuth,
    //   payeeSimonBiz,
    //   payeeSimonWs,
    // ] = await queryInterface.bulkInsert('payees', payeeData, {
    //   returning: true,
    // });

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

    // Define expense data
    const expenseData = [
      {
        name: 'Some expense name',
        user_id: johnUser.id,
        user_workspace_id: userWsJohn.id,
        category_id: catOneJohnSimon.id,
        payment_mode_id: cashJohn.id,
        // payee_id: payeeJohn.id,
        payee: 'some payee',
        // comment_id: commentJohn.id,
        amount: 1000,
        notes: 'some notes',
        expense_date: '2022-10-23',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some expense name',
        user_id: johnUser.id,
        user_workspace_id: userWsJohn.id,
        category_id: catTwoJohnSimon.id,
        payment_mode_id: creditJohn.id,
        // payee_id: payeeJohn.id,
        payee: 'some payee',
        // comment_id: null,
        amount: 3000,
        notes: 'some notes',
        expense_date: '2022-11-23',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some expense name',
        user_id: peterUser.id,
        user_workspace_id: userWsPeter.id,
        category_id: catOnePeterMary.id,
        payment_mode_id: cashPeter.id,
        // payee_id: payeePeter.id,
        payee: 'some payee',
        // comment_id: commentPeter.id,
        amount: 2000,
        notes: 'some notes',
        expense_date: '2022-12-23',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some expense name',
        user_id: peterUser.id,
        user_workspace_id: userWsPeter.id,
        category_id: catTwoPeterMary.id,
        payment_mode_id: creditPeter.id,
        // payee_id: payeePeter.id,
        payee: 'some payee',
        // comment_id: null,
        amount: 3000,
        notes: 'some notes',
        expense_date: '2022-01-23',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some expense name',
        user_id: maryUser.id,
        user_workspace_id: userWsMary.id,
        category_id: catTwoPeterMary.id,
        payment_mode_id: creditMary.id,
        // payee_id: payeeMary.id,
        payee: 'some payee',
        // comment_id: commentMary.id,
        amount: 3000,
        notes: 'some notes',
        expense_date: '2022-02-23',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some expense name',
        user_id: maryUser.id,
        user_workspace_id: userWsMary.id,
        category_id: catOnePeterMary.id,
        payment_mode_id: cashMary.id,
        // payee_id: null,
        payee: 'some payee',
        // comment_id: null,
        amount: 3000,
        notes: 'some notes',
        expense_date: '2022-03-23',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some expense name',
        user_id: ruthUser.id,
        user_workspace_id: userWsRuth.id,
        category_id: catOneRuthSimon.id,
        payment_mode_id: creditRuth.id,
        // payee_id: payeeRuth.id,
        payee: 'some payee',
        // comment_id: commentRuth.id,
        amount: 2000,
        notes: 'some notes',
        expense_date: '2022-04-23',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some expense name',
        user_id: ruthUser.id,
        user_workspace_id: userWsRuth.id,
        category_id: catTwoRuthSimon.id,
        payment_mode_id: cashRuth.id,
        // payee_id: payeeRuth.id,
        payee: 'some payee',
        // comment_id: null,
        amount: 2000,
        notes: 'some notes',
        expense_date: '2022-05-23',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some expense name',
        user_id: simonUser.id,
        user_workspace_id: userWsSimonBiz.id,
        category_id: catTwoRuthSimon.id,
        payment_mode_id: cashSimon.id,
        // payee_id: payeeSimonBiz.id,
        payee: 'some payee',
        // comment_id: commentSimon.id,
        amount: 4000,
        notes: 'some notes',
        expense_date: '2022-06-23',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Some expense name',
        user_id: simonUser.id,
        user_workspace_id: userWsSimonWs.id,
        category_id: catTwoJohnSimon.id,
        payment_mode_id: creditSimon.id,
        // payee_id: payeeSimonWs.id,
        payee: 'some payee',
        // comment_id: null,
        amount: 4000,
        notes: 'some notes',
        expense_date: '2022-07-23',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert expenses, returning=true,
    // and destructure the returned results array, for use in commentData
    const [johnExpenseOne, johnExpenseTwo, peterExpenseOne, peterExpenseTwo, maryExpenseOne, maryExpenseTwo, ruthExpenseOne, ruthExpenseTwo, simonExpenseOne, simonExpenseTwo] = await queryInterface.bulkInsert('expenses', expenseData, {
      returning: true,
    });

    // Define comment data
    const commentData = [
      {
        user_id: johnUser.id,
        expense_id: johnExpenseOne.id,
        comment: 'some comment',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: peterUser.id,
        expense_id: peterExpenseTwo.id,
        comment: 'some comment',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: maryUser.id,
        expense_id: maryExpenseOne.id,
        comment: 'some comment',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: ruthUser.id,
        expense_id: ruthExpenseOne.id,
        comment: 'some comment',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: simonUser.id,
        expense_id: simonExpenseOne.id,
        comment: 'some comment',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert expenses items
    await queryInterface.bulkInsert('comments', commentData);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('comments', null, {});
    await queryInterface.bulkDelete('expenses', null, {});
    await queryInterface.bulkDelete('payment_modes', null, {});
    await queryInterface.bulkDelete('categories', null, {});
    // await queryInterface.bulkDelete('payees', null, {});
    await queryInterface.bulkDelete('user_workspaces', null, {});
    await queryInterface.bulkDelete('workspace_authorities', null, {});
    await queryInterface.bulkDelete('workspaces', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
