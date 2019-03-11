# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     HuskyShop.Repo.insert!(%HuskyShop.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias HuskyShop.Repo

alias HuskyShop.Users.User

pwhash = Argon2.hash_pwd_salt("password")

Repo.insert!(%User{email: "alice@example.com", admin: true, password_hash: pwhash})
Repo.insert!(%User{email: "bob@example.com", admin: false, password_hash: pwhash})

alias HuskyShop.Products.Product

Repo.insert!(%Product{name: "Air Compressor", desc: "Pressurizes air really well",
                      price: Decimal.new("799.99"), inventory: 7})
Repo.insert!(%Product{name: "Paperclip (100 count)", desc: "Hold paper together",
                      price: Decimal.new("0.99"), inventory: 200})









