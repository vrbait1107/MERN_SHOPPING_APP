import NotificationService, {
  NOTIF_WISHLIST_CHANGED,
} from "./NotificationService";

// Singleton
let instance = null;

let ns = new NotificationService();

var wishlist = [];

class DataSevice {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  itemOnWishlist = (item) => {
    for (let i = 0; i < wishlist.length; i++) {
      if (wishlist[i]._id === item._id) {
        return true;
      }
    }
    return false;
  };

  addWishlistItem = (item) => {
    wishlist.push(item);
    ns.postNotification(NOTIF_WISHLIST_CHANGED, wishlist);
  };

  removeWishlistItem = (item) => {
    for (let i = 0; i < wishlist.length; i++) {
      if (wishlist[i]._id === item._id) {
        wishlist.splice(i, 1);
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishlist);
        break;
      }
    }
  };
}

export default DataSevice;
