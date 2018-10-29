defmodule HuskyShop.CartItemsTest do
  use HuskyShop.DataCase

  alias HuskyShop.CartItems

  describe "cart_items" do
    alias HuskyShop.CartItems.CartItem

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def cart_item_fixture(attrs \\ %{}) do
      {:ok, cart_item} =
        attrs
        |> Enum.into(@valid_attrs)
        |> CartItems.create_cart_item()

      cart_item
    end

    test "list_cart_items/0 returns all cart_items" do
      cart_item = cart_item_fixture()
      assert CartItems.list_cart_items() == [cart_item]
    end

    test "get_cart_item!/1 returns the cart_item with given id" do
      cart_item = cart_item_fixture()
      assert CartItems.get_cart_item!(cart_item.id) == cart_item
    end

    test "create_cart_item/1 with valid data creates a cart_item" do
      assert {:ok, %CartItem{} = cart_item} = CartItems.create_cart_item(@valid_attrs)
    end

    test "create_cart_item/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = CartItems.create_cart_item(@invalid_attrs)
    end

    test "update_cart_item/2 with valid data updates the cart_item" do
      cart_item = cart_item_fixture()
      assert {:ok, %CartItem{} = cart_item} = CartItems.update_cart_item(cart_item, @update_attrs)

      
    end

    test "update_cart_item/2 with invalid data returns error changeset" do
      cart_item = cart_item_fixture()
      assert {:error, %Ecto.Changeset{}} = CartItems.update_cart_item(cart_item, @invalid_attrs)
      assert cart_item == CartItems.get_cart_item!(cart_item.id)
    end

    test "delete_cart_item/1 deletes the cart_item" do
      cart_item = cart_item_fixture()
      assert {:ok, %CartItem{}} = CartItems.delete_cart_item(cart_item)
      assert_raise Ecto.NoResultsError, fn -> CartItems.get_cart_item!(cart_item.id) end
    end

    test "change_cart_item/1 returns a cart_item changeset" do
      cart_item = cart_item_fixture()
      assert %Ecto.Changeset{} = CartItems.change_cart_item(cart_item)
    end
  end
end
