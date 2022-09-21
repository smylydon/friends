/**
 * Interface for the 'Friends' data
 */
export interface FriendsEntity {
  id: string | number; // Primary ID
  name: string;
  friends?: FriendsEntity[];
  weight: number;
  dob: string;
}
