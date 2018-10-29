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

pwhash = Argon2.hash_pwd_salt("pass1")

Repo.insert!(%User{email: "alice@example.com", admin: true, password_hash: pwhash})
Repo.insert!(%User{email: "bob@example.com", admin: false, password_hash: pwhash})

alias HuskyShop.Products.Product
Repo.insert!(%Product{name: "Rubber Duck", desc: "Yellow",
                      price: Decimal.new("4.99"), inventory: 5})
Repo.insert!(%Product{name: "Bear", desc: "500lbs; angry",
                      price: Decimal.new("44.99"), inventory: 2})
Repo.insert!(%Product{name: "Cookie", desc: "chocolate oatmeal",
                      price: Decimal.new("0.99"), inventory: 2})
Repo.insert!(%Product{name: "Donut", desc: "chocolate frosted",
                      price: Decimal.new("1.19"), inventory: 2})

