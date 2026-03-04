const comments = require("../../comments.json")
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('comments').del()
  return await knex('comments').insert(comments.comments.map((comment) => {
    return {
      ...comment,
      date: new Date(comment.date)
    }
  }));
};
