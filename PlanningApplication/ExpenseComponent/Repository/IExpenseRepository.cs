﻿using PlanningApplication.Data;
using PlanningApplication.ExpenseComponent.Models;

namespace PlanningApplication.ExpenseComponent.Repository
{
    public interface IExpenseRepository
    {
        Task<Expense?> GetById(Guid id);
        Task<IEnumerable<Expense>> GetAll();
        Task<IEnumerable<Expense>> GetByEvent(Event heldEvent);
        Task<Expense?> Update(Expense expense);
        Task<Expense?> Delete(Expense expense);
        Task<Expense?> Create(Expense expense);
    }
}
