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
      author: comment.author,
      text: comment.text,
      image: comment.image,
      likes: comment.likes,
      created_at: new Date(comment.date),
      updated_at: new Date(comment.date),
    }
  }));
};
